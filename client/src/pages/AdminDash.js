// AdminDash.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminDash = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar is on the left */}
      <div className="flex-1 ml-4 p-8">
        <Outlet /> {/* This renders the nested route content */}
      </div>
    </div>
  );
};

export default AdminDash;
