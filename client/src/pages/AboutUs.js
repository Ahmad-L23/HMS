import React from 'react';
import Header from './../components/Header';

export default function AboutUs() {
  return (
    <div className="flex flex-col p-4">
      <Header image="https://img.freepik.com/premium-vector/team-meeting-around-table-with-laptops-coffee_1314935-53000.jpg?w=740"/>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start mt-20">
        {/* New Image Container on the Left */}
        <div className="w-full lg:w-1/2 h-auto p-4 rounded-lg">
          <img
            src="https://media.istockphoto.com/id/1295612631/vector/people-suffering-from-problems-attending-psychological-support-meeting-patients-sitting-in.jpg?s=1024x1024&w=is&k=20&c=WQsPM6GYBYXh0iO3FSfAsQi4CuXN0sKZCA8WjGcXNQI="
            alt="Health Management Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* New Text Container on the Right */}
        <div className="flex flex-col items-start w-full lg:w-1/2 ml-0 lg:ml-14 mt-8 lg:mt-0 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-black">Who We Are</h2>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            We are a dedicated team of professionals committed to improving the healthcare
            experience for patients. Our platform offers innovative solutions to streamline
            the appointment booking process, making it easier to connect with healthcare
            providers. With personalized features and user-friendly navigation, we ensure
            that your health management journey is as seamless as possible.
          </p>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            It's 2024: time to sink or swim.
          </p>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            We are your Social Media Marketing Agency.
          </p>
          
        </div>
      </div>
    </div>
  );
}
