import React from 'react';
import { DiAtlassian } from 'react-icons/di'; 
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className=" text-black py-8 mt-auto border-t-8 border-gray-500  max-w-7xl m-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Logo Section on the Left */}
          <div className="text-lg font-bold flex items-center space-x-2 p-2 rounded mb-40">
          <DiAtlassian className="w-8 h-8 text-blue-500" /> {/* Logo */}
          <Link to="/" className="text-black">MedLab Hospital</Link>
        </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul>
              <li> <Link to="/" className="text-black">Home</Link></li>
              <li> <Link to="/appointment" className="text-black">Appointment</Link></li>
              <li> <Link to="/services" className="text-black">Services</Link></li>
              <li> <Link to="/about" className="text-black">About Us</Link></li>
              <li> <Link to="/contact" className="text-black">Contact Us</Link></li>
            </ul>
          </div>

          {/* Hours Section */}
          <div>
            <h3 className="font-bold mb-2">Hours</h3>
            <ul>
              <li>Monday: 9 AM - 5 PM</li>
              <li>Tuesday: 9 AM - 5 PM</li>
              <li>Wednesday: 9 AM - 5 PM</li>
              <li>Thursday: 9 AM - 5 PM</li>
              <li>Friday: 9 AM - 5 PM</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-start">
            <h3 className="font-bold mb-2">Contact</h3>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Main St, City, Country</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
