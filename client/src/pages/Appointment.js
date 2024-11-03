import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Changed to named import
import config from '../config'

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');

  // Retrieve and decode the user ID from local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); // Updated here
      setUserId(decodedToken.id); // Assuming 'id' is in the token
    } else {
      console.error('User token not found in local storage.');
    }
  }, []);

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const appointmentData = {
        patient: userId, // The logged-in user ID
        doctor: selectedDoctor,
        date,
        time,
        description,
      };
     
      const response = await axios.post(`${config.apiUrl}/appointments`, appointmentData);
      if (response.status === 201) {
        alert('Appointment scheduled successfully!');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to schedule the appointment.');
    }
  };

  return (
    <div className="mt-20 max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Doctor Selection */}
        <label className="block text-lg font-medium text-gray-700">
          Select a Doctor
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">-- Choose a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                Dr. {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </label>

        {/* Date Selection */}
        <label className="block text-lg font-medium text-gray-700">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>

        {/* Time Selection */}
        <label className="block text-lg font-medium text-gray-700">
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>

        {/* Description */}
        <label className="block text-lg font-medium text-gray-700">
          Description (optional)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            rows="3"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}
