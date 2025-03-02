const express = require("express")
const router = express.Router()
const {registerUser, loginUser, logoutUser, getUserById, updateUser, resetPassword} = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

// Routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser);

// get user by id
router.get("/get-profile", authMiddleware, getUserById)

// update user
router.put("/update-profile", authMiddleware, updateUser)

// reset password
router.post("/reset-password", resetPassword)

module.exports = router