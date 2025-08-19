import multer from "multer"
import fs from 'fs'


const multerConfig=(uploadsPath)=>{
   
    if(!fs.existsSync(uploadsPath)){
       fs.mkdirSync(uploadsPath)
    }
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,uploadsPath)
        },
        filename:(req,file,cb)=>{
            const fileName=Date.now() + '-' + file.originalname
            cb(null,fileName)
        }
    })

    return multer({storage})
    
}

export default multerConfig