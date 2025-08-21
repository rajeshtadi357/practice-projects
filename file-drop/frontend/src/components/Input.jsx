import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearFileName, setFileName } from '../features/fileNameSlice'
import { clearInput, setInput } from '../features/inputSlice'
import cleanupUrls from '../utils/cleanup'
import { clearCompressInfo } from '../features/compressSlice'
import toast from 'react-hot-toast'
import axiosInstance from '../config/config'
import { SkeletonLoader, PreviewImg, Compress } from './comp.js'

const Input = () => {
  const uploadImg = useSelector((state) => state.inputImg)
  const compressImg = useSelector((state) => state.compressImg)
  const fileName = useSelector((state) => state.fileName)
  const inputRef = useRef()
  const dispatch = useDispatch()
  const [uploading, setUploading] = useState(false)
  const [compressing, setCompressing] = useState(false)

  const handleChange = async (e) => {
    cleanupUrls(uploadImg.blobUrl, compressImg.blobUrl)
    dispatch(clearFileName())
    dispatch(clearInput())
    dispatch(clearCompressInfo())
    setUploading(true)
    

    const file = e.target.files[0]
    if (!file) {
      setUploading(false)
      return toast.error('Please select a file')
    }

    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await axiosInstance.post('uploads', formData)

      dispatch(setFileName({ fileName: res.data.filename }))
      dispatch(
        setInput({
          name: file.name,
          blob: URL.createObjectURL(file),
          size: file.size,
        })
      )
      setUploading(false)
      toast.success('File uploaded successfully')
    } catch (error) {
      setUploading(false)
      console.error(error)
      toast.error('Error in server, please try again later')
    }
  }

  const clear = () => {
    if (!inputRef.current.value) return toast.error('No file selected to clear')
    inputRef.current.value = null
    dispatch(clearFileName())
    dispatch(clearInput())
    dispatch(clearCompressInfo())
    cleanupUrls(uploadImg.blobUrl, compressImg.blobUrl)
    toast.success('All cleared.')
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-8 w-full">
      {/* === Upload + Clear Buttons === */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-8 sm:px-10 py-3 sm:py-4 bg-white text-black font-semibold rounded-full shadow-md hover:shadow-xl hover:bg-gray-200 transition-all duration-300 text-base sm:text-lg"
        >
          Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          className="hidden"
        />

        <button
          onClick={clear}
          className="px-8 sm:px-10 py-3 sm:py-4 bg-gray-800 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 text-base sm:text-lg"
        >
          Clear
        </button>
      </div>

      {/* === Preview Section === */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-5xl justify-center items-center">
        {/* Uploaded Image */}
        {uploading ? (
          <SkeletonLoader />
        ) : (
          fileName.name && (
            <div className="flex flex-col items-center gap-4 w-full sm:w-1/2">
              <PreviewImg Img={uploadImg} alt="upload-preview" />
              <p className="text-sm text-gray-400">Original</p>
            </div>
          )
        )}

        {/* Compressed Image */}
        {compressing ? (
          <SkeletonLoader />
        ) : (
          compressImg.blobUrl && (
            <div className="flex flex-col items-center gap-4 w-full sm:w-1/2">
              <PreviewImg Img={compressImg} alt="compress-preview" />
             
              <p className="text-sm text-gray-400">Compressed</p>
            </div>
          )
        )}
      </div>

      {/* === Compress Controls === */}
      {fileName.name && <Compress uploadImg={uploadImg} setCompressing={setCompressing} />}
      {compressImg.blobUrl && 
          <a
                  href={compressImg.blobUrl}
                  download={`${fileName}-compressed`}
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-black rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300 text-lg font-medium w-full sm:w-auto text-center"
                >
                  Download
                </a>
      }
    </div>
  )
}

export default Input

