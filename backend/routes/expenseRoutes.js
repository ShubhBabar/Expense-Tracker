const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { addExpense, getExpense, editExpense } = require("../controllers/expenseController");
const router = express.Router();

router.post("/addExpense", authMiddleware, addExpense);
router.get("/getExpense", authMiddleware, getExpense);
router.put("/editExpense/:id", authMiddleware, editExpense)

module.exports = router;
