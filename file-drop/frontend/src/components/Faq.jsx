import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FAQ = () => {
  const faqs = [
    {
      question: "Is this tool free?",
      answer: "Yes, it’s completely free to use with no hidden costs.",
    },
    {
      question: "Do you store my images?",
      answer: "Your privacy matters! All images are deleted 10 minutes after processing.",
    },
    {
      question: "Does it work on mobile?",
      answer: "Yes, our tool works seamlessly on any device.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-10 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl bg-gray-900/50 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
            >
              <span className="text-lg font-semibold text-white">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-5 pb-4 text-gray-300 text-sm transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

