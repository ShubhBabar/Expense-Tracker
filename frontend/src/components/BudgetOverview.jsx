import React from "react";

const BudgetOverview = ({ budget, expenses }) => {
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBalance = budget - totalSpent;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">
      {/* Total Budget */}
      <div className="bg-blue-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Total Budget</h2>
        <p className="text-3xl font-bold mt-2">₹{budget}</p>
      </div>

      {/* Total Spent */}
      <div className="bg-red-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Total Spent</h2>
        <p className="text-3xl font-bold mt-2">₹{totalSpent}</p>
      </div>

      {/* Remaining Balance */}
      <div
        className={`rounded-2xl shadow-md p-6 flex flex-col items-center justify-center ${
          remainingBalance >= 0 ? "bg-green-500" : "bg-yellow-500"
        } text-white`}
      >
        <h2 className="text-xl font-semibold">Remaining Balance</h2>
        <p className="text-3xl font-bold mt-2">₹{remainingBalance}</p>
      </div>
    </div>
  );
};

export default BudgetOverview;
