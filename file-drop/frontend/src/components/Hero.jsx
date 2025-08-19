import React from 'react'

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[85vh] px-4 sm:px-8 lg:px-16 text-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-4xl">
        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
          Compress Your Images
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10">
          Best quality in any format — PNG, JPEG, and more.
        </p>

        {/* CTA */}
        <a
          href="#upload"
          className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-white text-black font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg md:text-xl"
        >
          Upload & Compress Now
        </a>
      </div>
    </section>
  )
}

export default Hero


