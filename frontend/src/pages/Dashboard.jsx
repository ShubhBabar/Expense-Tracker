import React from "react";
import UserNavbar from "../components/UserNavbar";
import Reports from "../components/Reports";
import BudgetOverview from "../components/BudgetOverview";

const Dashboard = () => {
  return (
    <div>
      <UserNavbar user={{ name: "John Doe" }} />
      <div className="p-4">
        <BudgetOverview/>
        <Reports  />
      </div>
    </div>
  );
};

export default Dashboard;
