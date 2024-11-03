// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-64 h-screen bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link
            to="appointments"
            className={isActive('/AdminDash/appointments') ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500"}
          >
            Appointments
          </Link>
        </li>
        <li>
          <Link
            to="doctors"
            className={isActive('/AdminDash/doctors') ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500"}
          >
            Doctors
          </Link>
        </li>
        <li>
          <Link
            to="patients"
            className={isActive('/AdminDash/patients') ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500"}
          >
            Patients
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
