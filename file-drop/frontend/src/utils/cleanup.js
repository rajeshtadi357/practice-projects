



const cleanupUrls=(uploadBlob, compressBlob)=>{
    if(uploadBlob){
        URL.revokeObjectURL(uploadBlob)
        console.log('upload blob cleanup')
    }
    if(compressBlob){
        URL.revokeObjectURL(compressBlob)
        console.log('compress blob cleared/cleaned up')
    }
}

export default cleanupUrls