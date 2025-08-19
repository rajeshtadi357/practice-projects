const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Upload Your Image",
      description: "Select any image in PNG, JPEG, or other popular formats.",
    },
    {
      number: "2",
      title: "Choose Compression Level",
      description: "Pick the perfect balance between file size and quality.",
    },
    {
      number: "3",
      title: "Download Optimized File",
      description: "Save your new, smaller image instantly to your device.",
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 lg:mb-20">
          How It Works
        </h2>

        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-gray-700 via-gray-600 to-transparent"></div>
          
          <div className="lg:max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`
                    relative flex items-start gap-6
                    ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left lg:col-start-2 lg:row-start-'+ (index + 1)}
                  `}
                >
                  {/* Circle with number - positioned differently for even/odd items */}
                  <div className="flex-shrink-0 relative">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-200 text-black font-bold shadow-lg">
                      {step.number}
                    </div>
                    
                    {/* Line connector for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-gray-700 via-gray-600 to-transparent"></div>
                    )}
                  </div>
                  
                  {/* Text content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-first' : ''}`}>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;



