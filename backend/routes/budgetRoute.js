const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {setBudget, getBudget, budgetSummary} = require("../controllers/budgetController")
const router = express.Router();

// Routes for Budget
router.post("/set-budget", authMiddleware, setBudget)
router.get("/get-budget", authMiddleware, getBudget)
router.get("/summary/:month",authMiddleware, budgetSummary)

module.exports = router;