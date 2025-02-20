import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BudgetOverview from "../components/BudgetOverview";
import Settings from "../components/Settings";
import Reports from "../components/Reports";
import ExpenseSummary from "../components/ExpenseSummary";

const Dashboard = () => {
  const mockExpenses = [
    { id: 1, name: "Groceries", category: "Food", amount: 150, date: "2025-02-14" },
    { id: 2, name: "Uber", category: "Travel", amount: 50, date: "2025-02-13" },
    { id: 3, name: "Gym Membership", category: "Health & Fitness", amount: 200, date: "2025-02-12" },
    { id: 4, name: "Laptop", category: "Shopping", amount: 1200, date: "2025-02-11" },
    { id: 5, name: "Insurance Premium", category: "Insurance", amount: 300, date: "2025-02-10" },
  ];

  const handleDelete = (id) => {
    console.log(`Deleted expense with id: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing expense with id: ${id}`);
  };

  // Settings component state
  const [budget, setBudget] = useState(5000);
  const [categories, setCategories] = useState(["Investment", "Bills", "Education"]);

  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // Reports data
  const monthlyData = [
    { month: "Jan", amount: 4000 },
    { month: "Feb", amount: 3500 },
    { month: "Mar", amount: 4500 },
    { month: "Apr", amount: 5000 },
  ];

  const categoryData = [
    { category: "Food", value: 150 },
    { category: "Travel", value: 50 },
    { category: "Health & Fitness", value: 200 },
    { category: "Shopping", value: 1200 },
    { category: "Insurance", value: 300 },
  ];

  const highestExpenses = [
    { category: "Shopping", amount: 1200 },
    { category: "Health & Fitness", amount: 200 },
    { category: "Food", amount: 150 },
  ];

  return (
    <div>
      <UserNavbar user={{ name: "John Doe" }} />
      <div className="p-4">
        <BudgetOverview budget={budget} expenses={mockExpenses} />
        <AddExpenseForm />
        <ExpenseList expenses={mockExpenses} handleDelete={handleDelete} handleEdit={handleEdit} />
        <Settings setBudget={setBudget} addCategory={addCategory} categories={categories} />
        <Reports monthlyData={monthlyData} categoryData={categoryData} highestExpenses={highestExpenses} />
        <ExpenseSummary categoryData={categoryData} />
      </div>
    </div>
  );
};

export default Dashboard;
