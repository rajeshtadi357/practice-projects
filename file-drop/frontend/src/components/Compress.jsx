
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompressInfo } from '../features/compressSlice'
import toast from 'react-hot-toast'
import axiosInstance from '../config/config'
import cleanupUrls from '../utils/cleanup'
import {SkeletonLoader, PreviewImg} from './comp.js'


const Compress = ({uploadImg, setCompressing}) => {
  const uploadFileName = useSelector((state) => state.fileName.name)

  const range = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  const [size, setSize] = useState(range[0])
  const compressImgBlob=useSelector(state=>state.compressImg)
  const dispatch = useDispatch()



  
  const selectSize = (e) => {
    setSize(e.target.value)
  }

  const compressImg = async () => {
    // cleanup 
    cleanupUrls(null,compressImgBlob.blobUrl)
    try {
      if (size == 0) return toast.error('please select a valid size to compress')
      if(size> uploadImg.size/1024){return toast.error("Select size less than your file size to compress")}
      if (!uploadFileName) return toast.error('File may have been deleted, please upload again')
       
      setCompressing(true)
      const res = await axiosInstance.get(`compress/${uploadFileName}`, { // base url with instance
        params: { size: size },
        responseType: 'blob',
        
      })

      dispatch(
        setCompressInfo({ blob: URL.createObjectURL(res.data), size: res.data.size })
      )
     
      if(size<=10){
         toast.success(`Could not reach target ${size} KB, returning smallest possible size instead.`)
      }
       setCompressing(false)
      toast.success('Image compressed, please download')
    } catch (error) {
      setCompressing(false)
      cleanupUrls(null,compressImgBlob.blobUrl)
      console.log(error)
      toast.error('Error occurred, please try again later')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Size Selector */}
      <select
        value={size}
        onChange={selectSize}
        className="px-4 py-3 rounded-full text-white bg-gray-900 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white transition-all duration-300 outline-none text-base sm:text-lg"
      >
        {range.map((kb) => (
          <option key={kb} value={kb} className="text-white bg-gray-900">
            {kb} kb
          </option>
        ))}
      </select>

      {/* Compress Button */}
      <button
        onClick={compressImg}
        className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-black font-semibold rounded-full shadow-md hover:shadow-xl hover:bg-gray-200 transition-all duration-300 text-base sm:text-lg"
      >
        Compress
      </button>

      
    </div>
  )
}

export default Compress
