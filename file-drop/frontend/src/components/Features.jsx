import { CheckCircleIcon } from '@heroicons/react/24/solid'

const Features = () => {
  const features = [
    {
      title: 'High Quality',
      desc: 'Reduce file size without sacrificing visual quality.',
    },
    {
      title: 'Fast & Secure',
      desc: 'Compression happens instantly, and we never store your files.',
    },
    {
      title: 'Multiple Formats',
      desc: 'Supports PNG, JPEG, and other popular formats.',
    },
  ]

  return (
    <section className="w-full py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-white mb-12">
          Why Use Our Image Compressor?
        </h2>

        {/* Flow layout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4 lg:gap-6 flex-1"
            >
              {/* Step number or icon */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-black font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-base">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
