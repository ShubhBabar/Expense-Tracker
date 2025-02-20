import React, { useState, useEffect } from 'react';

const ExpenseList = ({ expenses, handleDelete, handleEdit }) => {
  // State to track sorting order and column
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting is ascending
  const [sortedExpenses, setSortedExpenses] = useState(expenses); // State to hold sorted expenses
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [rowsPerPage] = useState(5); // Number of rows to display per page

  // Categories for the dropdown
  const categories = ['Food','Rent', 'Travel', 'Entertainment','Personal Care','Education & Learning', 'Health & Fitness', 'Shopping','Investments',  'Insurance','Other'];

  // Handle sorting by amount
  const handleSort = () => {
    const sorted = [...sortedExpenses]; // Create a copy of expenses to avoid mutating the original array
    if (sortOrder === 'asc') {
      // Sort in ascending order
      sorted.sort((a, b) => a.amount - b.amount);
      setSortOrder('desc'); // Change order to descending
    } else {
      // Sort in descending order
      sorted.sort((a, b) => b.amount - a.amount);
      setSortOrder('asc'); // Change order to ascending
    }
    setSortedExpenses(sorted); // Update the sorted expenses
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the expenses based on selected category and search query
  useEffect(() => {
    let filteredExpenses = [...expenses];

    // Filter by category if selected
    if (categoryFilter) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category === categoryFilter);
    }

    // Further filter by search query if entered
    if (searchQuery) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setSortedExpenses(filteredExpenses); // Update the sorted expenses
  }, [categoryFilter, searchQuery, expenses]);

  // Get current page data
  const indexOfLastExpense = currentPage * rowsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - rowsPerPage;
  const currentExpenses = sortedExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto bg-white p-6 shadow-md rounded-md max-w-6xl mx-auto w-full">
      {/* Category Filter Dropdown and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-wrap space-x-4 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSortedExpenses(expenses)} // Reset to show all expenses
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto"
          >
            Reset Filter
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
          />
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">Expense Name</th>
            <th className="px-4 py-2 text-left border-b">Category</th>
            <th
              className="px-4 py-2 text-left border-b cursor-pointer"
              onClick={handleSort}
            >
              Amount{' '}
              {sortOrder === 'asc' ? (
                <span>&#8593;</span> // Up arrow for ascending
              ) : (
                <span>&#8595;</span> // Down arrow for descending
              )}
            </th>
            <th className="px-4 py-2 text-left border-b">Date</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.length > 0 ? (
            currentExpenses.map((expense, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{expense.name}</td>
                <td className="px-4 py-2">{expense.category}</td>
                <td className="px-4 py-2">{expense.amount}</td>
                <td className="px-4 py-2">{expense.date}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-x-2 sm:space-y-0">
                    <button
                      onClick={() => handleEdit(expense.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                No expenses added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end mt-4 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:border-blue-500 border border-transparent'} text-white`}
        >
          Previous
        </button>
        
        {/* Page Numbers */}
        {[...Array(Math.ceil(sortedExpenses.length / rowsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500 border border-transparent'}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * rowsPerPage >= sortedExpenses.length}
          className={`px-4 py-2 rounded-md ${currentPage * rowsPerPage >= sortedExpenses.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:border-blue-500 border border-transparent'} text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
