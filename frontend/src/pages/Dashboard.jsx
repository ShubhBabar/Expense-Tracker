import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BudgetOverview from "../components/BudgetOverview";
import Settings from "../components/Settings";
import Reports from "../components/Reports";
import ExpenseSummary from "../components/ExpenseSummary";

const Dashboard = () => {

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
        <BudgetOverview />
        <AddExpenseForm />
        <ExpenseList />
        <Settings />
        <Reports monthlyData={monthlyData} categoryData={categoryData} highestExpenses={highestExpenses} />
        <ExpenseSummary />
      </div>
    </div>
  );
};

export default Dashboard;
