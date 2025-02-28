import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Reports = () => {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [highestExpenses, setHighestExpenses] = useState([]);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Unauthorized - No Token Found. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [monthlyRes, categoryRes, highestRes] = await Promise.all([
          axios.get("http://localhost:5000/expense/monthlydata", { headers }),
          axios.get("http://localhost:5000/expense/categorydata", { headers }),
          axios.get("http://localhost:5000/expense/highestexpenses", {
            headers,
          }),
        ]);

        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        setMonthlyData(
          monthlyRes.data.map((item) => ({
            ...item,
            month: monthNames[item.month - 1] || "Invalid Month",
          }))
        );

        setCategoryData(categoryRes.data);
        setHighestExpenses(highestRes.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const COLORS = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3A712",
    "#9D33FF",
    "#FF33A8",
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center sm:text-left">
        Reports & Insights
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Spending Line Chart */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Monthly Spending
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Professional Category-wise Distribution Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Category-wise Distribution
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={120}
                paddingAngle={5}
                label={({ category, percent }) =>
                  `${category} (${(percent * 100).toFixed(1)}%)`
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
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
                iconType="circle"
                formatter={(value) => (
                  <span style={{ marginLeft: "8px" }}>{value}</span>
                )}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Highest Expenses Bar Chart with Hover Effect */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Highest Expenses
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={highestExpenses}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#82ca9d"
              onMouseEnter={(data) => setHoveredBar(data)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {highestExpenses.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={hoveredBar === entry ? "#45a049" : "#82ca9d"}
                  style={
                    hoveredBar === entry ? { filter: "brightness(1.3)" } : {}
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {hoveredBar && (
          <div className="mt-3 text-center text-gray-700 font-semibold">
            {hoveredBar.category}: ₹{hoveredBar.amount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
