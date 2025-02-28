import React, { useState } from "react";
import axios from "axios";
import UserNavbar from './UserNavbar';

const Settings = () => {
  const [totalBudget, setTotalBudget] = useState("");

  // Handle setting the budget
  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    if (!totalBudget || isNaN(totalBudget) || totalBudget <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Unauthorized - No Token Found. Please log in again.");
        window.location.href = "/login"; // Redirect to login
        return;
      }

      const currentMonth = new Date().toISOString().slice(0, 7);

      const response = await axios.post(
        "http://localhost:5000/budget/set-budget",
        { totalBudget: Number(totalBudget), month: currentMonth },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`.trim(),
          },
        }
      );

      alert("Budget saved successfully!");
      setTotalBudget(""); // Clear input after saving
    } catch (error) {
      console.error(
        "Error saving budget:",
        error.response?.data || error.message
      );
      alert(
        `Failed to save budget: ${
          error.response?.data?.message || "Server error"
        }`
      );
    }
  };

  return (
    <div>
      <UserNavbar/>
      <div className="max-w-3xl mx-auto p-6 mt-5 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center sm:text-left">
          Settings
        </h2>

        {/* Set Monthly Budget */}
        <form onSubmit={handleBudgetSubmit} className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Set Monthly Budget:
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              placeholder="Enter budget (₹)"
              className="px-4 py-2 border rounded-md w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
