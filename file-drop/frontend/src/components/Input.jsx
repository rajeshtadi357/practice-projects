import { useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearFileName, setFileName } from '../features/fileNameSlice'
import { clearInput, setInput } from '../features/inputSlice'
import cleanupUrls from '../utils/cleanup'
import { clearCompressInfo } from '../features/compressSlice'
import toast from 'react-hot-toast'
import axiosInstance from '../config/config'

const Input = () => {
  const uploadImg = useSelector((state) => state.inputImg)
  const compressImg = useSelector((state) => state.compressImg)
  const inputRef = useRef()
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    cleanupUrls(uploadImg.blobUrl, compressImg.blobUrl)

    const file = e.target.files[0]
    if (!file) return toast.error('Please select a file')

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
     
      toast.success('file uploaded successfully')
      
    } catch (error) {
     
      console.log(error)
      toast.error('error in server, please try again later')
    }
  }

  const clear = () => {
    if (!inputRef.current.value) return toast.error('No file selected to clear')
    inputRef.current.value = null
    dispatch(clearFileName())
    dispatch(clearInput())
    dispatch(clearCompressInfo())
    cleanupUrls(uploadImg.blobUrl, compressImg.blobUrl)
    console.log('All cleared')
    toast.success('all cleared.')
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      {/* Choose File Button */}
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

      {/* Clear Button */}
      <button
        onClick={clear}
        className="px-8 sm:px-10 py-3 sm:py-4 bg-gray-800 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 text-base sm:text-lg"
      >
        Clear
      </button>
    </div>
  )
}

export default Input
