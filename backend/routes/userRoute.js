const express = require("express")
const router = express.Router()
const {registerUser, loginUser, logoutUser, getUserById, updateUser} = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

// Routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser);

// get user by id
router.get("/:id", authMiddleware, getUserById)

// update user
router.put("/:id", authMiddleware, updateUser)

module.exports = router