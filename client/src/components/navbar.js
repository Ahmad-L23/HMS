import React, { useState } from 'react';
import { DiAtlassian } from 'react-icons/di';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white text-black px-4 py-3 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title with Shadow */}
        <div className="text-lg font-bold flex items-center space-x-2 shadow p-2 rounded">
          <DiAtlassian className="w-8 h-8 text-blue-500" />
          <Link to="/" className="text-black">MedLab Hospital</Link>
        </div>

        {/* Centered Menu Items */}
        <div className="hidden md:flex space-x-4 mx-auto">
          <Link to="/" className="text-sm hover:bg-blue-100 px-2 py-1 rounded font-bold">Home</Link>
          <Link to="/appointment" className="text-sm hover:bg-blue-100 px-2 py-1 rounded font-bold">Appointment</Link>
          <Link to="/AdminDash" className="text-sm hover:bg-blue-100 px-2 py-1 rounded font-bold">AdminDash</Link>
          <Link to="/about" className="text-sm hover:bg-blue-100 px-2 py-1 rounded font-bold">About Us</Link>
          <Link to="/contact" className="text-sm hover:bg-blue-100 px-2 py-1 rounded font-bold">Contact Us</Link>
        </div>

        {/* Right-aligned Sign Up and Login Buttons */}
        <div className="hidden md:flex space-x-4 mr-5">
          <Link to="/signup">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900">Login</button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-black focus:outline-none" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-gray-100 space-y-2">
          <Link to="/" className="block text-sm text-black hover:bg-blue-100 px-2 py-1 rounded font-bold">Home</Link>
          <Link to="/appointment" className="block text-sm text-black hover:bg-blue-100 px-2 py-1 rounded font-bold">Appointment</Link>
          <Link to="/services" className="block text-sm text-black hover:bg-blue-100 px-2 py-1 rounded font-bold">Services</Link>
          <Link to="/about" className="block text-sm text-black hover:bg-blue-100 px-2 py-1 rounded font-bold">About Us</Link>
          <Link to="/contact" className="block text-sm text-black hover:bg-blue-100 px-2 py-1 rounded font-bold">Contact Us</Link>
          <div className="mt-2 space-x-4">
            <Link to="/signup">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded w-full mb-2 hover:from-blue-700 hover:to-blue-900">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded w-full hover:from-blue-700 hover:to-blue-900">Login</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
