import React from 'react'

const PreviewImg = ({ Img, alt }) => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden max-w-sm w-full">
      {/* Image */}
      <div className="w-full overflow-hidden">
        <img
          src={Img.blobUrl}
          alt={alt}
          className="w-full h-auto object-contain max-h-[400px] mx-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-6 text-center space-y-2">
        {alt === 'upload-preview' ? (
          <>
            <p className="text-gray-300 text-sm sm:text-base">
              <span className="font-semibold text-white">File Name:</span> {Img.name}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              <span className="font-semibold text-white">Size:</span>{" "}
              {Img.size >= 1024 * 1024
                ? (Img.size / (1024 * 1024)).toFixed(2) + " MB"
                : (Img.size / 1024).toFixed(2) + " KB"}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-300 text-sm sm:text-base">
              <span className="font-semibold text-white">Size:</span> {(Img.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-green-400 text-sm sm:text-base font-medium">
              🚀 Boom! Your image is compressed!
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default PreviewImg

