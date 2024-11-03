import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    yearsOfExperience: '',
    workingHours: [], // Initialize working hours
    status: 'Active',
  });
  const [action, setAction] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/doctors`);
      setDoctors(response.data);
      setFilteredDoctors(response.data); // Initial filtered data
      setAction('getAll');
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching doctors");
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWorkingHoursChange = (index, field, value) => {
    const updatedHours = [...form.workingHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setForm({ ...form, workingHours: updatedHours });
  };

  const handleAddWorkingHour = () => {
    setForm({ ...form, workingHours: [...form.workingHours, { day: '', startTime: '', endTime: '' }] });
  };

  const handleRemoveWorkingHour = (index) => {
    const updatedHours = form.workingHours.filter((_, i) => i !== index);
    setForm({ ...form, workingHours: updatedHours });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedDoctor) {
        // Update the doctor
        response = await axios.put(`${config.apiUrl}/doctors/${selectedDoctor._id}`, form);
        setDoctors(doctors.map(doc => (doc._id === selectedDoctor._id ? response.data : doc)));
      } else {
        // Create a new doctor
        response = await axios.post(`${config.apiUrl}/doctors`, form);
        setDoctors([...doctors, response.data]);
      }
      alert('Doctor saved successfully');
      // Reset form after submission
      setForm({
        name: '',
        email: '',
        password: '',
        specialty: '',
        yearsOfExperience: '',
        workingHours: [], // Reset working hours
        status: 'Active',
      });
      setSelectedDoctor(null);
      setAction('getAll');
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setForm({
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      yearsOfExperience: doctor.yearsOfExperience,
      workingHours: doctor.workingHours || [], // Ensure to set working hours
      status: doctor.status,
    });
    setAction('update');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/doctors/${id}`);
      setDoctors(doctors.filter(doc => doc._id !== id));
      setFilteredDoctors(filteredDoctors.filter(doc => doc._id !== id));
      alert('Doctor deleted successfully');
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredDoctors(
      doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Doctors</h1>

      {/* Action Buttons */}
      <div className="flex space-x-4 justify-center mb-8">
        <button onClick={() => setAction('create')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Doctor</button>
        <button onClick={() => fetchDoctors()} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Get All Doctors</button>
      </div>

      {/* Search Bar */}
      {(action === 'getAll' || action === 'update') && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or specialization"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      )}

      {/* Conditional Form Display */}
      {(action === 'create' || action === 'update') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Doctor's Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            value={form.specialty}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            value={form.yearsOfExperience}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />

          {/* Working Hours Section */}
          <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
          {form.workingHours.map((hour, index) => (
            <div key={index} className="flex space-x-2">
              <select
                name="day"
                value={hour.day}
                onChange={(e) => handleWorkingHoursChange(index, 'day', e.target.value)}
                className="p-2 border border-gray-300 rounded w-1/3"
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <input
                type="time"
                name="startTime"
                value={hour.startTime}
                onChange={(e) => handleWorkingHoursChange(index, 'startTime', e.target.value)}
                required
                className="p-2 border border-gray-300 rounded w-1/3"
              />
              <input
                type="time"
                name="endTime"
                value={hour.endTime}
                onChange={(e) => handleWorkingHoursChange(index, 'endTime', e.target.value)}
                required
                className="p-2 border border-gray-300 rounded w-1/3"
              />
              <button type="button" onClick={() => handleRemoveWorkingHour(index)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddWorkingHour} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add Working Hour</button>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg w-full hover:bg-blue-600">
            {selectedDoctor ? 'Update Doctor' : 'Create Doctor'}
          </button>
        </form>
      )}

      {/* Display Doctors List in Card Format */}
      {(action === 'getAll' || action === 'update') && (
        <div className="grid grid-cols-1 gap-4 mt-8">
          {filteredDoctors.map(doctor => (
            <div key={doctor._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-gray-600">{`Specialty: ${doctor.specialty}`}</p>
                <p className="text-gray-600">{`Email: ${doctor.email}`}</p>
                <p className="text-gray-600">{`Experience: ${doctor.yearsOfExperience} years`}</p>
                <span className={`px-2 py-1 rounded text-xs font-bold ${doctor.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {doctor.status}
                </span>
                <h3 className="mt-2 font-semibold">Working Hours</h3>
                <ul className="list-disc ml-5">
                  {doctor.workingHours.map((hour, index) => (
                    <li key={index}>
                      {hour.day}: {hour.startTime} - {hour.endTime}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(doctor)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(doctor._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
