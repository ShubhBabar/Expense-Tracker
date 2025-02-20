import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseSummary = ({ categoryData }) => {
  const totalSpent = categoryData.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Summary</h2>

      {/* Total Spending Card */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="bg-red-100 p-4 rounded-md shadow-md w-full sm:w-1/2 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
          <p className="text-2xl font-bold text-red-600">₹{totalSpent}</p>
        </div>
      </div>

      {/* Pie Chart for Category-wise Expenses */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Category-wise Spending</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseSummary;
