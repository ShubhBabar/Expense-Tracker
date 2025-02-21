import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import UpdateUserProfile from "./components/UpdateUserProfile";
import User from "./components/User";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user" element={<User />} />
        <Route path="/edit-user" element={<UpdateUserProfile />} />
        <Route path="/add-expense" element={<AddExpenseForm />} />
        <Route path="/all-expenses" element={<ExpenseList />} />
        <Route path="/expense-summary" element={<ExpenseSummary />} />
        <Route path="/set-budget" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
