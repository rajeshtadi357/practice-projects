import { useDispatch, useSelector } from 'react-redux'
import { Hero, Input,  Features, HowItWorks, Footer, Faq, } from './components/comp.js'
import { useEffect } from 'react'
import cleanupUrls from './utils/cleanup.js'
import { clearFileName } from './features/fileNameSlice.js'
import { clearCompressInfo } from './features/compressSlice.js'
import { clearInput } from './features/inputSlice.js'
import { Toaster } from 'react-hot-toast' // ✅ Added
import useStartServer from './hooks/startServer.js'


function App() {
  const uploadImg = useSelector((state) => state.inputImg)
  const compressImg = useSelector((state) => state.compressImg)
  const dispatch = useDispatch()
  
  const {isServerReady,err}=useStartServer()

  useEffect(() => {
    return () => {
      cleanupUrls(uploadImg.blobUrl, compressImg.blobUrl)
      dispatch(clearFileName())
      dispatch(clearCompressInfo())
      dispatch(clearInput())
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* ✅ Toast Notification Renderer */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration:2000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px',
          },
        }}
      />

      {
        err &&
       <div className="w-full bg-blue-500/90 text-white px-4 py-3 rounded-md shadow-md text-center text-sm sm:text-base">
          🚨 Server is down, please try again later.
      </div>

 
      }

      {/* Main content wrapper */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-24 space-y-20">
        <Hero />
        <section id="upload" className="max-w-4xl  mx-auto">
          <Input  />
        </section>
      </div>

      {/* Sections with premium feel */}
      <section id="features" className="bg-gradient-to-b from-black to-gray-900 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-8 lg:px-20">
          <Features />
        </div>
      </section>

      <section id="how-it-works" className="bg-black py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-8 lg:px-20">
          <HowItWorks />
        </div>
      </section>

      <section id="faq" className="bg-gradient-to-t from-black to-gray-900 py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-8 lg:px-20">
          <Faq />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App




