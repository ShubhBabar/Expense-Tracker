import React, { useState } from "react";
import Select from 'react-select';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const handleChange = (e) => {
    // If e is a React Select change event, handle it differently
    if (e.target) {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    } else {
      // For the Select component, update category value
      setExpense({ ...expense, category: e.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.name || !expense.amount || !expense.date) {
      alert("Please fill all fields");
      return;
    }
    onAddExpense(expense);
    setExpense({ name: "", amount: "", category: "Food", date: "" });
  };
  const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Education & Learning', label: 'Education & Learning' },
    { value: 'Investments', label: 'Investments' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Health & Fitness', label: 'Health & Fitness' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Personal Care', label: 'Personal Care' },
    { value: 'Other', label: 'Other' },
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
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
