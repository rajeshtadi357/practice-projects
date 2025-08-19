import { compressImageToTargetSize } from "../handlers/handler.js"
import fs from 'fs'


const uploadImage=async(req,res)=>{
      const file=req.file
      
    try {
        if(!file){return res.status(401).json({msg:"no file selected.. please select a file"})}
        res.status(200).json({msg:"post uploaded successfully", filename:file.filename})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"internal server error, please try again later"})
    }
}
const compressImage=async(req,res)=>{
    const {filename}=req.params
    const kb=Number(req.query.size)

    try {
        if(!filename)return res.status(400).json({msg:"no file path"})
        
        if(!fs.existsSync(`./uploads/${filename}`)){return res.status(404).json({msg:"file got deleted, please upload"})}
        const compressPath=`./compress/${filename}`

        const buffer=await compressImageToTargetSize(`./uploads/${filename}`,kb)
        if(!fs.existsSync('./compress')){
            fs.mkdirSync('./compress')
        }
        fs.writeFileSync(compressPath,buffer)
        res.download(compressPath)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"internal server error, please try again later"})
    }
}

export {uploadImage,compressImage}