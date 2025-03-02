import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "./UserNavbar";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Unauthorized - No Token Found. Please log in again.");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/user/get-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo((prev) => ({
          ...prev,
          ...response.data,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Unauthorized - No Token Found. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/user/update-profile",
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("User information updated successfully!");
      setUserInfo(response.data.user); 
      console.log("Updated User Data:", response.data.user);

      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="p-6 mt-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {["username", "firstName", "lastName", "email", "mobileNumber"].map(
            (field, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <label
                  htmlFor={field}
                  className="text-sm font-medium text-gray-700"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={userInfo[field] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            )
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
