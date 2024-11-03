import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'
function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/doctors`); // Adjust API URL as needed
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-8">Our Doctors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={doctor.image || 'https://via.placeholder.com/150'} // Default image if doctor.image is not available
                alt={`Doctor ${index + 1}`}
                className="rounded-full mb-2 w-20 h-20 sm:w-24 sm:h-24 object-cover"
              />
              <p className="text-lg font-bold text-black">Dr. {doctor.name}</p>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-600">Experience: {doctor.yearsOfExperience} years</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No doctors available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorList;
