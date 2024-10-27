import React, { useState } from "react";
import Header from "./../components/Header";
import usersApi from "../api/UsersApi";
import authApi from "../api/auth.js";
import { toast } from "react-toastify";
import TextInput from "../components/TextInput.js"; // Import the TextInput component
import Joi from "joi"; // Import Joi

export default function Signup() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    address: "",
    gender: "", // For gender selection
    password: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [specialPasswordMessage, setSpecialPasswordMessage] = useState("");
  const [errors, setErrors] = useState({}); // State for holding error messages

  // Special passwords for roles
  const specialPasswords = {
    admin: "AdminSpecialPassword123",
    doctor: "DoctorSpecialPassword456",
  };

  // Joi validation schema
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(), // Disable TLD check
    mobileNumber: Joi.string().min(10).max(10).required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "doctor", "patient").default("patient"),
});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Display special password message if role is "Admin" or "Doctor"
    if (name === "role") {
      if (value === "admin") {
        setSpecialPasswordMessage(
          "Please enter the special password you have as an Admin."
        );
      } else if (value === "doctor") {
        setSpecialPasswordMessage(
          "Please enter the special password you have as a Doctor."
        );
      } else {
        setSpecialPasswordMessage("");
      }
    }
  };

  // Validate form data
  const validate = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMessages = {};
      error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message; // Map error messages to field names
      });
      setErrors(errorMessages); // Update state with errors
      return false;
    }
    setErrors({}); // Clear errors if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validate()) {
      return; // Early exit if validation fails
    }

    // Check for special passwords if the role is admin or doctor
    if (formData.role === "admin" || formData.role === "doctor") {
      const requiredPassword = specialPasswords[formData.role];
      if (formData.password !== requiredPassword) {
        setErrorMessage(`Invalid password for ${formData.role}`);
        return; // Early exit if the password is incorrect
      }
    }

    // Prepare the data to be sent
    try {
      // Send the request to the signup API
      const { data } = await usersApi.createUser(formData);
      authApi.setToken(data.token);

      setSuccessMessage("Signup successful! Redirecting to the homepage in 3 seconds...");
      setTimeout(() => {
        window.location = '/';
      }, 3000);
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        toast.error(err.response.data);
      } else {
        // Display error message from the server or a generic error message
        setErrorMessage(err.response?.data?.message || "Signup failed. Please try again.");
        toast.error(err.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Header image="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg" />

      <div className="flex flex-col items-start mb-10 mt-24 ml-24">
        <h1 className="text-5xl font-bold text-gray-500 mb-2">Sign Up</h1>
        <h2 className="text-2xl text-gray-500 mb-4 mt-2">
          Please sign up to continue
        </h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do <br />{" "}
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="flex flex-col items-center mb-10 mt-24">
        <div className="w-1/2">
          <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
            <div className="text-center mb-16">
              <img
                src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1805.jpg"
                alt="logo"
                className="w-52 inline-block"
              />
              <h4 className="text-gray-800 text-base font-semibold mt-6">
                Sign up into your account
              </h4>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="text-gray-800 text-sm mb-2 block">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {specialPasswordMessage && (
                <p className="text-blue-600 text-sm mb-4">
                  {specialPasswordMessage}
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-8">
                <TextInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  error={errors.firstName} // Pass the error for the first name
                />
                <TextInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  error={errors.lastName} // Pass the error for the last name
                />
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  error={errors.email} // Pass the error for email
                />
                <TextInput
                  label="Mobile No."
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  error={errors.mobileNumber} // Pass the error for mobile number
                />
                <TextInput
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  error={errors.dateOfBirth} // Pass the error for date of birth
                />
                <TextInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  error={errors.address} // Pass the error for address
                />
                <TextInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  error={errors.password} // Pass the error for password
                />
              </div>

              <div className="mb-8">
                <label className="text-gray-800 text-sm mb-2 block">Select Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-3.5 rounded-md w-24 flex justify-center  transition duration-300 ease-in-out hover:bg-blue-700"
                >
                  SIGN UP
                </button>
              </div>

              {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
