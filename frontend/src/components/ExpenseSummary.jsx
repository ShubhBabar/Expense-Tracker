import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import UserNavbar from "./UserNavbar";

const ExpenseSummary = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenseSummary = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Unauthorized - No Token Found. Please log in again.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/expense/expense-summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedData = response.data.map((item) => ({
          category: item.category,
          value: item.totalAmount,
        }));

        setCategoryData(formattedData);
        setTotalSpent(formattedData.reduce((sum, item) => sum + item.value, 0));
      } catch (err) {
        console.error("Error fetching expense summary:", err);
        setError("Failed to load expense summary");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseSummary();
  }, []);

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4CAF50",
    "#FF9800",
    "#8A2BE2",
    "#20B2AA",
    "#FF4500",
    "#DA70D6",
    "#32CD32",
  ];

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <UserNavbar/>
      <div className="max-w-4xl mx-auto p-4 mt-5 sm:p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Expense Summary
        </h2>

        {/* Total Spending Card */}
        <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="bg-red-100 p-4 sm:p-6 rounded-md shadow-md w-full sm:w-1/2 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              ₹{totalSpent}
            </p>
          </div>
        </div>

        {/* Pie Chart for Category-wise Expenses */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Category-wise Spending
          </h3>
          <div className="w-full flex justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={window.innerWidth < 640 ? 80 : 100} // Adjust for mobile
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    window.innerWidth > 640
                      ? `${name} ${(percent * 100).toFixed(0)}%`
                      : null
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    fontSize: window.innerWidth < 640 ? "12px" : "14px",
                  }}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
