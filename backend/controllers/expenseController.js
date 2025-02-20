const Expense = require("../models/expenseModel");

const addExpense = async (req, res) => {
  const { name, amount, category, date } = req.body;

  try {
    if (!name || !amount || !category || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a valid number" });
    }

    const newExpense = await Expense.create({
      name,
      amount: parsedAmount,
      category,
      date,
      userId: req.user.userId,
    });
    res
      .status(201)
      .json({ message: "Expense added successfully!", expense: newExpense });
  } catch (error) {
    console.error("Error in addExpense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res
      .status(200)
      .json({ message: "Expenses fetched successfully", expenses });
  } catch (error) {
    console.error("Fetch Expenses Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const editExpense = async (req, res) => {};

module.exports = { addExpense, getExpense, editExpense };
