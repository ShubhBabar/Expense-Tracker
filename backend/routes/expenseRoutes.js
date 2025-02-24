const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { addExpense, getExpense, editExpense, deleteExpense, expenseSummary, getExpenseById } = require("../controllers/expenseController");
const router = express.Router();

// Routes for Expense
router.post("/addExpense", authMiddleware, addExpense);
router.get("/getExpense", authMiddleware, getExpense);
router.get("/getExpense/:id", authMiddleware, getExpenseById);
router.put("/editExpense/:id", authMiddleware, editExpense)
router.delete("/deleteExpense/:id", authMiddleware, deleteExpense)

// to show data for piechart
router.get("/expense-summary", authMiddleware, expenseSummary)


module.exports = router;
