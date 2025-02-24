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
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUser = async (req,res)=>{
    const { id } = req.params;
    const { username, firstName, lastName, email, mobile, password } = req.body;
    try {
        let updateFields = { username,firstName, lastName, email, mobile };
    
        if (password) {
          updateFields.password = await bcrypt.hash(password, 10);
        }
    
        const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
    
        if (!user) {
          return res.status(404).json({ error: "User Not Found!" });
        }
    
        res.status(200).json({ message: "User updated successfully!", user }); //here updated user is send
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { registerUser, loginUser, logoutUser, getUserById, updateUser };
