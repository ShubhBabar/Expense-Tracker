import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

const AddExpenseForm = () => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "Food",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // If e is a React Select change event, handle it differently
    if (e.target) {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    } else {
      // For the Select component, update category value
      setExpense({ ...expense, category: e.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.name || !expense.amount || !expense.date) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Unauthorized - No Token Found. Please log in again.");
        window.location.href = "/login"; // Redirect to login
        return;
      }

      console.log("Using token:", token);
      const response = await axios.post(
        "http://localhost:5000/expense/addExpense",
        expense,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`.trim(),
          },
        }
      );

      if (response.status === 201) {
        alert("Expense added successfully!");
        setExpense({ name: "", amount: "", category: "Food", date: "" });
      } else {
        alert(response.data.message || "Failed to add expense");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Error adding expense. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: "Food", label: "Food" },
    { value: "Rent", label: "Rent" },
    { value: "Travel", label: "Travel" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Education & Learning", label: "Education & Learning" },
    { value: "Investments", label: "Investments" },
    { value: "Insurance", label: "Insurance" },
    { value: "Health & Fitness", label: "Health & Fitness" },
    { value: "Shopping", label: "Shopping" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Other", label: "Other" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded-md max-w-2xl mx-auto w-full"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Add Expense</h2>

      <label className="block mb-2">Expense Name</label>
      <input
        type="text"
        name="name"
        value={expense.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-3"
        placeholder="Enter expense name"
        required
      />

      <label className="block mb-2">Amount ($)</label>
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-3"
        placeholder="Enter amount"
        required
      />

      <label className="block mb-2">Category</label>
      <Select
        name="category"
        value={options.find((option) => option.value === expense.category)}
        onChange={handleChange}
        options={options}
        className="w-full mb-3"
      />

      <label className="block mb-2">Date</label>
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-3"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default AddExpenseForm;
