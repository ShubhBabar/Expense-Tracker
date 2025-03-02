// User.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Unauthorized - No Token Found. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        
        const response = await axios.get("http://localhost:5000/user/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEditProfile = () => {
    navigate("/edit-user");
  };

  if (loading) {
    return <div className="text-center text-gray-600 mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  return (
    <div>
      <UserNavbar/>
      <div className="p-6 mt-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
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
            <span>{userInfo.firstName}</span>
          </div>
          <div>
            <span className="font-semibold">Last Name: </span>
            <span>{userInfo.lastName}</span>
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            <span>{userInfo.email}</span>
          </div>
          <div>
            <span className="font-semibold">Mobile: </span>
            <span>{userInfo.mobileNumber}</span>
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
    </div>
  );
};

export default User;
