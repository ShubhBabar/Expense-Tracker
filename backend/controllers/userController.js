const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  // console.log("Received Data:", req.body);
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
      countryCode,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashPassword,
      mobileNumber,
      countryCode,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set true in production
      sameSite: "strict",
    });
    
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logout successful",
      token: null,
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.user?.userId; // Get from middleware
    if (!userId) return res.status(400).json({ message: "User ID is required" });
    
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - No User ID found" });
    }

    const { username, firstName, lastName, email, mobileNumber, password } = req.body;

    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }

    // Update fields only if provided
    user.username = username || user.username;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { identifier, newPassword } = req.body;

    // Find user by username or mobile number
    const user = await User.findOne({
      $or: [{ username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserById, updateUser, resetPassword };
