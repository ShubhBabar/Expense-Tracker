import React from "react";
import UserNavbar from "../components/UserNavbar";
import Reports from "../components/Reports";

const Dashboard = () => {
  return (
    <div>
      <UserNavbar user={{ name: "John Doe" }} />
      <div className="p-4">
        <Reports  />
      </div>
    </div>
  );
};

export default Dashboard;
