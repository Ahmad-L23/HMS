import React from 'react';

function DoctorList({ doctors }) {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-8">Our Doctors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={doctor.image}
              alt={`Doctor ${index + 1}`}
              className="rounded-full mb-2 w-20 h-20 sm:w-24 sm:h-24 object-cover"
            />
            <p className="text-lg font-bold text-black">Dr. {doctor.name}</p>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
