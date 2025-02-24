import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      await axios.post("http://localhost:5000/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove token from localStorage
      localStorage.removeItem("authToken");

      alert("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error.response?.data?.message || error.message);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Expense Tracker Logo" className="h-8 w-35" />
      </div>

      <div className="hidden md:flex space-x-6">
        <Link to="/add-expense" className="hover:underline">
          Add Expense
        </Link>
        <Link to="/all-expenses" className="hover:underline">
          All Expenses
        </Link>
        <Link to="/expense-summary" className="hover:underline">
          Expense Summary
        </Link>
        <Link to="/set-budget" className="hover:underline">
          Set Budget
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-500 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link
            to="/add-expense"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Add Expense
          </Link>
          <Link
            to="/all-expenses"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            All Expenses
          </Link>
          <Link
            to="/expense-summary"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Expense Summary
          </Link>
          <Link
            to="/set-budget"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Set Budget
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
