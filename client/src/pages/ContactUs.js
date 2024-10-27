import React from 'react';

export default function ContactUs() {
  return (
    <div className="flex flex-col items-center p-6 lg:p-14 bg-gradient-to-b from-blue-50 to-blue-200 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl lg:text-5xl font-bold text-center text-blue-800 mb-12 animate-fadeIn">
        Contact Us
      </h1>

      {/* Contact Form Section */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform transition duration-500 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.2)] mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center lg:text-left">
          Get in Touch
        </h2>
        
        <form className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            required
          />
          <textarea
            placeholder="Your Message"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            rows="5"
            required
          ></textarea>
          <button className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-105">
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Details Section */}
      <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl lg:justify-between space-y-10 lg:space-y-0 lg:space-x-8 text-center lg:text-left">
        {/* Address */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full lg:w-1/2 transform transition duration-500 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.2)]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Address</h3>
          <p className="text-gray-600 leading-relaxed">123 Health St, Cityville</p>
          <p className="text-gray-600 leading-relaxed">Country, 12345</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full lg:w-1/2 transform transition duration-500 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.2)]">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Contact Details</h3>
          <p className="text-gray-600 leading-relaxed">Email: contact@healthcare.com</p>
          <p className="text-gray-600 leading-relaxed">Phone: +1 234 567 890</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col items-center mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Follow Us</h3>
        <div className="flex space-x-6">
          <a href="#" className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition duration-300 ease-in-out">
            <i className="fab fa-facebook-f fa-2x"></i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600 transform hover:scale-110 transition duration-300 ease-in-out">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800 transform hover:scale-110 transition duration-300 ease-in-out">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-900 transform hover:scale-110 transition duration-300 ease-in-out">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
