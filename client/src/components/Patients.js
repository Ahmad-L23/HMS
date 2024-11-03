import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState({
    user: '',
    dateOfBirth: '',
    medicalHistory: '',
    doctor: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/patients`);
      setPatients(response.data);
      setFilteredPatients(response.data); // Initial filtered data
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchUsers();
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatient) {
        // Update existing patient
        const response = await axios.put(`${config.apiUrl}/patients/${selectedPatient._id}`, form);
        setPatients(patients.map(pat => (pat._id === selectedPatient._id ? response.data : pat)));
      } else {
        // Create new patient
        const response = await axios.post(`${config.apiUrl}/patients`, form);
        setPatients([...patients, response.data]);
      }
      // Reset form
      setForm({ user: '', dateOfBirth: '', medicalHistory: '', doctor: '' });
      setSelectedPatient(null);
      setFilteredPatients(patients); // Reset filtered patients
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setForm(patient);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/patients/${id}`);
      setPatients(patients.filter(pat => pat._id !== id));
      setFilteredPatients(filteredPatients.filter(pat => pat._id !== id)); // Update filtered patients
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = patients.filter(patient => {
      const user = users.find(user => user._id === patient.user);
      return user && user.name.toLowerCase().includes(query);
    });

    setFilteredPatients(filtered);
  };

  // Handlers for patient actions
  const handleCreatePatient = () => {
    setSelectedPatient(null);
    setForm({ user: '', dateOfBirth: '', medicalHistory: '', doctor: '' });
  };

  const handleGetAllPatients = () => {
    fetchPatients();
  };

  const handleGetPatientById = async (id) => {
    try {
      const response = await axios.get(`${config.apiUrl}/patients/${id}`);
      setSelectedPatient(response.data);
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching patient by ID:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8">{selectedPatient ? 'Edit Patient' : 'Patients'}</h1>
      
      {/* Action Buttons for Patients */}
      <div className="flex space-x-4 mb-8">
        <button onClick={handleCreatePatient} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Patient</button>
        <button onClick={handleGetAllPatients} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Get All Patients</button>
      </div>
      
      {/* Search Input for Filtering Patients */}
      <input
        type="text"
        placeholder="Search patient by name"
        value={searchQuery}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />

      {/* Form to create or edit a patient */}
      <form onSubmit={handleSubmit} className="mb-4">
        {!selectedPatient && ( // Show user selection only when creating a new patient
          <select
            name="user"
            value={form.user}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          >
            <option value="" disabled>Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        )}

        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        
        <textarea
          name="medicalHistory"
          placeholder="Medical History"
          value={form.medicalHistory}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        
        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        >
          <option value="" disabled>Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
          ))}
        </select>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
          {selectedPatient ? 'Update Patient' : 'Create Patient'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Registered Patients</h2>
      <div className="grid grid-cols-1 gap-4">
        {filteredPatients.map(patient => {
          const user = users.find(user => user._id === patient.user);
          return (
            <div key={patient._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{`Patient Name: ${user ? user.name : 'Unknown'}`}</p>
                <p className="text-gray-600">{`Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`}</p>
                <p className="text-gray-600">{`Medical History: ${patient.medicalHistory}`}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(patient)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(patient._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                <button onClick={() => handleGetPatientById(patient._id)} className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">Get By ID</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
