import { Navigate, Outlet } from "react-router-dom";

const AuthRedirect = () => {
  const token = localStorage.getItem("authToken"); // Get the token from localStorage

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthRedirect;
