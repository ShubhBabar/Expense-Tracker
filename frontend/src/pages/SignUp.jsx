import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    countryCode: "+1", // default country code
  });

  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    // Add more countries as needed
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data: ", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Main Container Box */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section (Info about the application) */}
        <div className="w-full md:w-2/5 bg-blue-500 text-white p-8 flex justify-center items-center md:block hidden">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Welcome to Our Platform
            </h2>
            <p className="text-lg">
              Sign up today and unlock powerful features to manage your account,
              stay connected, and get the best user experience. Create your
              profile and start using our platform!
            </p>

            {/* Added list to showcase features */}
            <ul className="list-disc pl-5 mt-4 text-lg text-gray-300">
              <li>Manage your account effortlessly</li>
              <li>Stay connected with your network</li>
              <li>Get personalized user experiences</li>
              <li>Enjoy exclusive features and updates</li>
            </ul>

            <p className="mt-4">
              Already have an account?
              <Link
                to="/login"
                className="text-yellow-300 font-medium hover:underline ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Sign Up Form) */}
        <div className="w-full md:w-3/5 bg-white p-8 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Create an Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input
                  type="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Full Name */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Mobile Number with Country Code */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Mobile Number
                </label>
                <div className="flex space-x-2">
                  {/* Country Code Dropdown */}
                  <div className="w-1/4">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    >
                      {countryCodes.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.code} - {item.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Number */}
                  <div className="w-3/4">
                    <input
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                      className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-500 font-medium hover:underline ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
