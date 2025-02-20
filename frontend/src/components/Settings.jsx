import React, { useState } from "react";

const Settings = ({ setBudget, addCategory, categories }) => {
  const [budgetInput, setBudgetInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  // Handle setting the budget
  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (!budgetInput || isNaN(budgetInput) || budgetInput <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }
    setBudget(Number(budgetInput));
    setBudgetInput("");
  };

  // Handle adding a new category
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryInput.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    addCategory(categoryInput.trim());
    setCategoryInput("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
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
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
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

      {/* Add New Category */}
      <form onSubmit={handleCategorySubmit} className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Add New Category:
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Enter category name"
            className="px-4 py-2 border rounded-md w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition-all"
          >
            Add
          </button>
        </div>
      </form>

      {/* Display Added Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories:</h3>
        {categories.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {categories.map((cat, index) => (
              <li
                key={index}
                className="px-4 py-1 bg-gray-100 rounded-full text-gray-800 text-sm shadow-sm"
              >
                {cat}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No categories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Settings;
