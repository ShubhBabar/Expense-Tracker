import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", formData,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        console.log("Login Response:", response.data);
        alert("Login successful!");
        localStorage.setItem("authToken", response.data.token);
        console.log("Token stored:", response.data.token);
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      alert("something went wrong while trying to Login")
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Log In to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500 font-medium hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LogIn