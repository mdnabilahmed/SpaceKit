import React, { useState } from "react";

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null); // First item open by default

  const faqs = [
    {
      question: "What's the quality of your products?",
      answer:
        "We prioritize quality in every item we sell. Our products are designed to be durable, functional, and stylish.",
    },
    {
      question: "Do you offer returns?",
      answer:
        "You can return any unused product within 30 days of purchase for a full refund.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship worldwide. Shipping fees and delivery times vary depending on the location.",
    },
    {
      question: "How long will my order take to arrive?",
      answer:
        "Once your order ships, we will send you a tracking link via email to monitor the delivery.",
    },
    {
      question: "Are your products environmentally friendly?",
      answer:
        "Orders can be changed or cancelled within 24 hours of placement. Please contact support immediately.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center pt-8 md:pt-16">
      <h1 className="font-light text-2xl md:text-4xl pb-8 md:pb-16 text-center text-black tracking-wide px-4">
        Frequently asked questions
      </h1>

      <div className="w-full space-y-0">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-200"
          >
            <div
              className={`min-h-[64px] md:h-16 cursor-pointer transition-all duration-200 ease-in-out ${
                openIndex === index
                  ? "bg-blue-50 hover:bg-gray-200"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center h-full px-4 md:px-8 lg:px-16 py-4 md:py-0">
                <h2
                  className={`text-sm md:text-base font-medium flex-1 pr-4 leading-relaxed ${
                    openIndex === index ? "text-blue-900" : "text-black"
                  }`}
                >
                  {faq.question}
                </h2>
                <span
                  className={`text-lg md:text-xl transition-transform duration-300 ease-in-out flex-shrink-0 ${
                    openIndex === index
                      ? "rotate-180 text-blue-600"
                      : "rotate-0 text-black"
                  }`}
                >
                  ∧
                </span>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden bg-white ${
                openIndex === index
                  ? "max-h-40 md:max-h-32 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`px-4 md:px-8 lg:px-16 pb-4 md:pb-6 pt-2 transform transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
              >
                <p className="text-black text-sm md:text-base leading-normal font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="w-full bg-white mt-16 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <img
                  src="https://cdn.prod.website-files.com/66ec6afe3cc26899cbbb300a/66face70e9cfc8ce74be2c83_Logo%20Spacekit.svg"
                  alt="image"
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Explore */}
            <div className="text-center">
              <h3 className="text-black font-medium text-base mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center">
              <h3 className="text-black font-medium text-base mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Others */}
            <div className="text-center">
              <h3 className="text-black font-medium text-base mb-4">Others</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    Style Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Utility */}
            <div className="text-center">
              <h3 className="text-black font-medium text-base mb-4">Utility</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    Instruction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-black"
                  >
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-black hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="m16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
          </div>

          {/* Bottom Links */}
          <div className="flex justify-center space-x-8 text-xs text-gray-500">
            <a href="#" className="hover:text-black">
              Terms
            </a>
            <a href="#" className="hover:text-black">
              Style Guide
            </a>
            <a href="#" className="hover:text-black">
              Copyright
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
