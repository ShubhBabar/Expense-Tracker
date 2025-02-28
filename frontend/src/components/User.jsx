// User.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  // Sample user data
  const userInfo = {
    username: "Shubhambabar",
    firstname: "Shubham",
    lastname: "Babar",
    email: "shubham@example.com",
    mobile: "1234567890",
    password: "Shubham@123",
  };

  // Navigate to UserProfile page to edit user info
  const handleEditProfile = () => {
    navigate("/edit-user");
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        User Information
      </h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Username: </span>
          <span>{userInfo.username}</span>
        </div>
        <div>
          <span className="font-semibold">First Name: </span>
          <span>{userInfo.firstname}</span>
        </div>
        <div>
          <span className="font-semibold">Last Name: </span>
          <span>{userInfo.lastname}</span>
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          <span>{userInfo.email}</span>
        </div>
        <div>
          <span className="font-semibold">Mobile: </span>
          <span>{userInfo.mobile}</span>
        </div>
        <div>
          <span className="font-semibold">Password: </span>
          <span>{userInfo.password}</span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleEditProfile}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default User;
