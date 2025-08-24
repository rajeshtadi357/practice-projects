import fs from 'fs';
import path from 'path';
import sharp from 'sharp';


const cleanUp = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Unable to read folder ${folderPath}:`, err.message);
      return;
    }
    if (files.length === 0) {
            console.log(`No files to clean up in folder: ${folderPath}`);
            return;
    } 

    files.forEach((file) => {
        
      const filePath = path.join(folderPath, file);
      fs.rm(filePath, (err) => {
        if (err) {
          console.error(`Error deleting ${filePath}:`, err.message);
        } else {
          console.log(`Deleted: ${filePath}`);
        }
      });
    });
  });
};





const compressImageToTargetSize = async (inputPath, targetKb, outputPath) => {
  console.log("Starting binary search for target size:", targetKb, "KB");

  let low = 1;
  let high = 100;
  let bestQuality = 100;

 

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // write compressed file
    await sharp(inputPath).jpeg({ quality: mid }).toFile(outputPath);

    const compressedSize = fs.statSync(outputPath).size / 1024;

    if (compressedSize > targetKb) {
      high = mid - 1;
    } else {
      bestQuality = mid;
      low = mid + 1;
      console.log(`✅ Candidate at quality=${mid}, size=${compressedSize} KB`);
    }
  }

  // Final pass: write with best quality found
  await sharp(inputPath).jpeg({ quality: bestQuality }).toFile(outputPath);
  console.log("Final chosen quality:", bestQuality);
};


const removeFile=(path)=>{
   fs.unlink(path, (err)=>{
      if(err) return console.log(err)
      else console.log(`${path} deleted`)
   })
}

export {cleanUp, compressImageToTargetSize, removeFile}