import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const navigate = useNavigate();

  // Initialize state for user information
  const [userInfo, setUserInfo] = useState({
    username: "Shubhambabar",
    firstname: "Shubham",
    lastname: "Babar",
    email: "shubham@example.com",
    mobile: "1234567890",
    password: "Shubham@123"
  });

  // Handle input changes for user info fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Handle form submission (update user info)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User information updated successfully!");
    navigate("/user");
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col space-y-2">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userInfo.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="lastname" className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={userInfo.mobile}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
