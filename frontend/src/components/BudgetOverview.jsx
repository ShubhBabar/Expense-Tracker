import axios from "axios";
import React, { useEffect, useState } from "react";

const BudgetOverview = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Unauthorized - No Token Found. Please log in again.");
          window.location.href = "/login";
          return;
        }
        const currentMonth = new Date().toISOString().slice(0, 7);
        const budgetResponse = await axios.get(
          `http://localhost:5000/budget/get-budget?month=${currentMonth}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalBudget(budgetResponse.data.totalBudget || 0);

        const expensesResponse = await axios.get(
          "http://localhost:5000/expense/expense-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpenses(expensesResponse.data || []);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    fetchBudgetData();
  }, []);

  const totalSpent = expenses.reduce((acc, expense) => acc + (expense.totalAmount || 0), 0);
  const remainingBalance = totalBudget - totalSpent;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">
      {/* Total Budget */}
      <div className="bg-blue-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Total Budget</h2>
        <p className="text-3xl font-bold mt-2">₹{totalBudget}</p>
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
