import React from 'react';
import Header from './../components/Header';
import DoctorList from '../components/DoctorList';

export default function Home() {
  return (
    <div className="flex flex-col p-4">
      {/* First Section */}
      <Header image="https://media.istockphoto.com/id/1432905102/vector/schedule-doctor-appointment-2d-vector-isolated-illustration.jpg?s=1024x1024&w=is&k=20&c=wVQg4kp373gtS8T5sOxxAbrEVX_pTD9y_fdEC2munaE="/>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start mt-20">
        {/* New Image Container on the Left */}
        <div className="w-full lg:w-1/2 h-auto p-4 rounded-lg">
          <img
            src="https://t3.ftcdn.net/jpg/03/20/70/36/240_F_320703626_Ou7K8k8aS2HM6qayhstPHvxiROipGdxV.jpg"
            alt="Health Management Illustration"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>

        {/* New Text Container on the Right */}
        <div className="flex flex-col items-start w-full lg:w-1/2 ml-0 lg:ml-14 mt-8 lg:mt-0 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-black">Who We Are</h2>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            We are a dedicated team of professionals committed to improving the healthcare experience for patients.
            Our platform offers innovative solutions to streamline the appointment booking process,
            making it easier to connect with healthcare providers. With personalized features and user-friendly
            navigation, we ensure that your health management journey is as seamless as possible.
          </p>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            It's 2024: time to sink or swim.
          </p>
          <p className="text-sm sm:text-base font-semibold text-black mt-4 tracking-wide leading-6">
            We are your Social Media Marketing Agency.
          </p>
          <button className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 rounded-lg shadow-lg">
            See more
          </button>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-8">Our Services</h2>
        <div className="flex flex-col sm:flex-row justify-around bg-light-blue-100 p-4 rounded-lg gap-4">
          {/* Service 1 */}
          <div className="flex flex-col items-center">
            <img
              src="https://www.ukri.org/wp-content/uploads/2023/05/MRC-180523-MRI-GettyImages-1421382089.jpg"
              alt="Service 1"
              className="mb-2 rounded-lg"
            />
            <p className="text-xl sm:text-3xl font-bold text-center text-black mb-8">Neurosciences</p>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://www.ukri.org/wp-content/uploads/2023/05/MRC-180523-MRI-GettyImages-1421382089.jpg"
              alt="Service 2"
              className="mb-2 rounded-lg"
            />
            <p className="text-xl sm:text-3xl font-bold text-center text-black mb-8">Cardiology</p>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center">
            <img
              src="https://www.ukri.org/wp-content/uploads/2023/05/MRC-180523-MRI-GettyImages-1421382089.jpg"
              alt="Service 3"
              className="mb-2 rounded-lg"
            />
            <p className="text-xl sm:text-3xl font-bold text-center text-black mb-8">Pediatrics</p>
          </div>
        </div>
      </div>

      {/* Our Doctors Section */}
      <DoctorList />

      {/* Send Us a Message Section */}
      <div className="mt-20 lg:mt-32 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-6">Send Us a Message</h2>
        <form className="flex flex-col space-y-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 border border-gray-300 rounded-lg p-2"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <input
            type="tel"
            placeholder="Mobile Number"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <textarea
            rows="4"
            placeholder="Message"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 rounded-lg shadow-lg w-32 mx-auto">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
