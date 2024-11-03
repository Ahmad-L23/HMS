import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
    description: '',
    status: 'Scheduled',
  });
  const [action, setAction] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/appointments`);
      setAppointments(response.data);
      setFilteredAppointments(response.data); // Initial filtered data
      setAction('getAll');
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch all users (patients)
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/users`);
      setUsers(response.data);
      console.log("Fetched users:", response.data); // Log fetched users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/doctors`);
      setDoctors(response.data);
      console.log("Fetched doctors:", response.data); // Log fetched doctors
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching users and doctors");
    fetchUsers();
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAppointment) {
        const response = await axios.put(`${config.apiUrl}/appointments/${selectedAppointment._id}`, form);
        setAppointments(appointments.map(app => (app._id === selectedAppointment._id ? response.data : app)));
        alert('Appointment updated successfully');
      } else {
        const response = await axios.post(`${config.apiUrl}/appointments`, form);
        setAppointments([...appointments, response.data]);
        alert('Appointment created successfully');
      }
      setForm({ patient: '', doctor: '', date: '', time: '', description: '', status: 'Scheduled' });
      setSelectedAppointment(null);
      setAction('getAll');
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setForm(appointment);
    setAction('update');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/appointments/${id}`);
      setAppointments(appointments.filter(app => app._id !== id));
      setFilteredAppointments(filteredAppointments.filter(app => app._id !== id));
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleGetById = () => {
    setAction('getById');
    setFilteredAppointments(appointments);
  };

  const handleUpdateSearch = () => {
    setAction('update');
    setFilteredAppointments(appointments);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAppointments(
      appointments.filter(appointment => {
        const patient = users.find(user => user._id === appointment.patient);
        const doctor = doctors.find(doctor => doctor._id === appointment.doctor);

        return (
          (patient && patient.name?.toLowerCase().includes(query)) || 
          (doctor && doctor.name?.toLowerCase().includes(query))
        );
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Appointments</h1>

      {/* Action Buttons */}
      <div className="flex space-x-4 justify-center mb-8">
        <button onClick={() => setAction('create')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Appointment</button>
        <button onClick={() => fetchAppointments()} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Get All Appointments</button>
        <button onClick={handleGetById} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Get Appointment By ID</button>
        <button onClick={handleUpdateSearch} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update Appointment</button>
      </div>

      {/* Search Bar for Get By ID and Update */}
      {(action === 'getById' || action === 'update') && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by patient or doctor name"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      )}

      {/* Conditional Form Display */}
      {(action === 'create' || action === 'update') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="patient" className="text-sm font-semibold">Select Patient</label>
            <select
              name="patient"
              value={form.patient}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>Select Patient</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="doctor" className="text-sm font-semibold">Select Doctor</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
              ))}
            </select>
          </div>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg w-full hover:bg-blue-600">
            {selectedAppointment ? 'Update Appointment' : 'Create Appointment'}
          </button>
        </form>
      )}

      {/* Display Appointments List in Card Format */}
      {(action === 'getAll' || action === 'getById' || action === 'update') && (
        <div className="grid grid-cols-1 gap-4 mt-8">
          {filteredAppointments.map(appointment => (
            <div key={appointment._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{`Appointment with Doctor: ${doctors.find(doc => doc._id === appointment.doctor)?.name || 'N/A'}`}</p>
                <p className="text-gray-600">{`Patient: ${users.find(user => user._id === appointment.patient)?.name || 'N/A'}`}</p>
                <p className="text-gray-600">{`Date: ${appointment.date}, Time: ${appointment.time}`}</p>
                <span className={`px-2 py-1 rounded text-xs font-bold ${appointment.status === 'Scheduled' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {appointment.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(appointment)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(appointment._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
