
import { compressImageToTargetSize, removeFile } from "../handlers/handler.js"
import fs from 'fs'


const uploadImage=async(req,res)=>{
    console.log("uploading image");
    
      const file=req.file
      
    try {
        if(!file){return res.status(401).json({msg:"no file selected.. please select a file"})}
        res.status(200).json({msg:"post uploaded successfully", filename:file.filename})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"internal server error, please try again later"})
    }
}



const compressImage = async (req, res) => {
  const { filename } = req.params;
  const kb = Number(req.query.size);

  try {
    if (!filename) return res.status(400).json({ msg: "no file path" });

    const inputPath = `./uploads/${filename}`;
    if (!fs.existsSync(inputPath)) {
      return res.status(404).json({ msg: "file got deleted, please upload" });
    }

    // ensure compress folder exists
    if (!fs.existsSync("./compress")) {
      fs.mkdirSync("./compress");
    }

    const outputPath = `./compress/${filename}`;

    await compressImageToTargetSize(inputPath, kb, outputPath);

    // stream file to client
    res.download(outputPath, (err) => {
      if (err) {
        console.error("Download error:", err);
       return res.status(500).json({ msg: "error sending file" });
      }
      console.log("compressed file sent succesfully")
      removeFile(inputPath)
      removeFile(outputPath)
    });

    
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "internal server error, please try again later" });
  }
};


export {uploadImage,compressImage}