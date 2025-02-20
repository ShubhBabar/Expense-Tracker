import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const Reports = ({ monthlyData, categoryData, highestExpenses }) => {
  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F3A712", "#9D33FF", "#FF33A8"];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center sm:text-left">
        Reports & Insights
      </h2>

      {/* Monthly Spending Line Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Distribution Pie Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Category-wise Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Highest Expenses Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Highest Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={highestExpenses}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
