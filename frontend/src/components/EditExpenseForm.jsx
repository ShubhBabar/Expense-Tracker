// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";

// const EditExpenseForm = () => {
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     if (e.target) {
//       setExpense({ ...expense, [e.target.name]: e.target.value });
//     } else {
//       setExpense({ ...expense, category: e.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!expense.name || !expense.amount || !expense.date) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         alert("Unauthorized - No Token Found. Please log in again.");
//         window.location.href = "/login";
//         return;
//       }

//       const response = await axios.put(
//         `http://localhost:5000/expense/updateExpense/${expense._id}`,
//         expense,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`.trim(),
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Expense updated successfully!");
//       } else {
//         alert(response.data.message || "Failed to update expense");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error updating expense. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const options = [
//     { value: "Food", label: "Food" },
//     { value: "Rent", label: "Rent" },
//     { value: "Travel", label: "Travel" },
//     { value: "Entertainment", label: "Entertainment" },
//     { value: "Education & Learning", label: "Education & Learning" },
//     { value: "Investments", label: "Investments" },
//     { value: "Insurance", label: "Insurance" },
//     { value: "Health & Fitness", label: "Health & Fitness" },
//     { value: "Shopping", label: "Shopping" },
//     { value: "Personal Care", label: "Personal Care" },
//     { value: "Other", label: "Other" },
//   ];

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 shadow-md rounded-md max-w-2xl mx-auto w-full"
//     >
//       <h2 className="text-lg font-semibold mb-4 text-center">Edit Expense</h2>

//       <label className="block mb-2">Expense Name</label>
//       <input
//         type="text"
//         name="name"
//         value={expense.name}
//         onChange={handleChange}
//         className="w-full p-2 border rounded-md mb-3"
//         required
//       />

//       <label className="block mb-2">Amount ($)</label>
//       <input
//         type="number"
//         name="amount"
//         value={expense.amount}
//         onChange={handleChange}
//         className="w-full p-2 border rounded-md mb-3"
//         required
//       />

//       <label className="block mb-2">Category</label>
//       <Select
//         name="category"
//         value={options.find((option) => option.value === expense.category)}
//         onChange={handleChange}
//         options={options}
//         className="w-full mb-3"
//       />

//       <label className="block mb-2">Date</label>
//       <input
//         type="date"
//         name="date"
//         value={expense.date}
//         onChange={handleChange}
//         className="w-full p-2 border rounded-md mb-3"
//         required
//       />

//       <div className="flex justify-between">
//         <button
//           type="button"
//           className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Expense"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditExpenseForm;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditExpenseForm = () => {
  const { id } = useParams(); // Get expense ID from URL
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch expense data when component mounts
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Unauthorized - No Token Found. Please log in again.");
          navigate("/login");
          return;
        }

        console.log("Fetching expense for ID:", id);

        const response = await axios.get(`http://localhost:5000/expense/getExpense/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setExpense(response.data.expense);
        } else {
          alert("Failed to fetch expense details");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching expense.");
      }
    };

    fetchExpense();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target) {
      setExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setExpense((prev) => ({ ...prev, category: e.value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.name || !expense.amount || !expense.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Unauthorized - No Token Found. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/expense/editExpense/${id}`,
        expense,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Expense updated successfully!");
        navigate("/dashboard"); // Redirect after update
      } else {
        alert("Failed to update expense");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error updating expense.");
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
      <h2 className="text-lg font-semibold mb-4 text-center">Edit Expense</h2>

      <label className="block mb-2">Expense Name</label>
      <input
        type="text"
        name="name"
        value={expense.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-3"
        required
      />

      <label className="block mb-2">Amount ($)</label>
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-3"
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

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Expense"}
        </button>
      </div>
    </form>
  );
};

export default EditExpenseForm;
