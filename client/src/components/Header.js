import React from 'react'

export default function Header(prop) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start flex-grow">
        {/* Text Container on the Right */}
        <div className="flex flex-col items-start ml-0 lg:ml-14 mt-14 lg:mt-28 w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 break-words text-black">
            We help people to <br /> get appointments <br /> online
          </h1>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            Book your medical appointments easily and quickly from the comfort of your home.
            Our platform allows you to choose your preferred time and doctor, ensuring that you
            receive the care you need without long wait times. <br/> Experience a seamless process
            that prioritizes your health and convenience.
          </p>
          
        </div>

        {/* Image Container on the Left */}
        <div className="w-full lg:w-1/2 h-auto p-4 mt-8 lg:mt-0">
          <img
            src={prop.image}
            alt="Appointment Illustration"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>
  )
}
