// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from "./components/footer"; 
import Home from './pages/Home'; 
import Appointment from './pages/Appointment';
import AdminDash from './pages/AdminDash'; // Import Admin Dashboard
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Appointments from './components/Appointments'; // Admin nested pages
import Doctors from './components/Doctor';
import Patients from './components/Patients';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin dashboard routes with nested routes */}
        <Route path="/AdminDash" element={<AdminDash />}>
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="patients" element={<Patients />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
