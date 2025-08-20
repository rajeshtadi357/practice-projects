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

const compressImageToTargetSize=async(inputPath,targetKb)=>{

    
   
    console.log('starting binary search operation to get the desired compressed size')
    let low=1
    let high=100
    let bestBuffer=null;

    const uploadedBuffer=fs.readFileSync(inputPath)
    const uploadedSize=uploadedBuffer.length/1024
    console.log(`uploadedsize : ${uploadedSize} and targetsie : ${targetKb}`)
    if(targetKb>uploadedSize){
        console.log("Image is already within target size, no compression needed.");
        return uploadedBuffer ;
    }

    while(low<=high){
      let mid=Math.floor((low+high)/2)
      const buffer=await sharp(inputPath).jpeg({quality:mid}).toBuffer()

      const bufferSize=buffer.length/1024
      console.log(`img compressed with quality ${mid}% , and kb: ${bufferSize}`)
      if(bufferSize>targetKb){
        console.log(`${bufferSize} > ${targetKb}, so running the search op again`)
         high=mid-1
      }else{
        bestBuffer=buffer
        low=mid+1;
        console.log(`got the best buffer with quality ${mid} and kb : ${bufferSize}`)
      }
    }

    if (!bestBuffer) {
      console.log(`⚠️ Could not reach target ${targetKb} KB, returning smallest possible size instead.`)
      bestBuffer = await sharp(inputPath).jpeg({ quality: 1 }).toBuffer()
      console.log(bestBuffer)
    }
    return bestBuffer
}

export {cleanUp, compressImageToTargetSize}