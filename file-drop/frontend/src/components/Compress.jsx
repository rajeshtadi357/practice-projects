import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompressInfo } from '../features/compressSlice'
import toast from 'react-hot-toast'

const Compress = () => {
  const uploadFileName = useSelector((state) => state.fileName.name)
  const range = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  const [size, setSize] = useState(range[0])
  const dispatch = useDispatch()

  const selectSize = (e) => {
    setSize(e.target.value)
  }

  const compressImg = async () => {
    try {
      if (size == 0) return toast.error('please select a valid size to compress')
      if (!uploadFileName) return toast.error('File may have been deleted, please upload again')

      const res = await axios.get(`http://localhost:3000/compress/${uploadFileName}`, {
        params: { size: size },
        responseType: 'blob',
      })

      dispatch(
        setCompressInfo({ blob: URL.createObjectURL(res.data), size: res.data.size })
      )
      toast.success('Image compressed, please download')
    } catch (error) {
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
