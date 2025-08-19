import { useDispatch, useSelector } from 'react-redux'
import { Hero, Input, PreviewImg, Compress, Features, HowItWorks, Footer, Faq } from './components/comp.js'
import { useEffect, useState } from 'react'
import cleanupUrls from './utils/cleanup.js'
import { clearFileName } from './features/fileNameSlice.js'
import { clearCompressInfo } from './features/compressSlice.js'
import { clearInput } from './features/inputSlice.js'
import { Toaster } from 'react-hot-toast' // ✅ Added

function App() {
  const uploadFileName = useSelector((state) => state.fileName.name)
  const uploadImg = useSelector((state) => state.inputImg)
  const compressImg = useSelector((state) => state.compressImg)
  const dispatch = useDispatch()
  

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

      {/* Main content wrapper */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-24 space-y-20">
        <Hero />
        <section id="input-section" className="max-w-4xl mx-auto">
          <Input />
        </section>

        {uploadFileName && (
          <section className="space-y-12">
            {/* Preview images */}
            <div className="flex flex-col lg:flex-row flex-wrap gap-10 lg:gap-16 items-center justify-center">
              <PreviewImg Img={uploadImg} alt="upload-preview" />
              {compressImg.blobUrl && <PreviewImg Img={compressImg} alt="compress-preview" />}
            </div>

            {/* Compress button */}
            <div className="flex justify-center">
              <Compress />
            </div>

            {/* Download button */}
            {compressImg.blobUrl && (
              <div className="flex justify-center">
                <a
                  href={compressImg.blobUrl}
                  download={`${uploadFileName}-compressed`}
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-black rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-200 transition-all duration-300 text-lg font-medium"
                >
                  Download
                </a>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Sections with premium feel */}
      <section id="features" className="bg-gradient-to-b from-black to-gray-900 py-16 sm:py-20 lg:py-28">
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




