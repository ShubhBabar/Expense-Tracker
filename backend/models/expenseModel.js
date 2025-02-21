const mongoose = require("mongoose");
// Schema for expense
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Food",
      "Rent",
      "Travel",
      "Entertainment",
      "Education & Learning",
      "Investments",
      "Insurance",
      "Health & Fitness",
      "Shopping",
      "Personal Care",
      "Other",
    ],
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Schema for budget

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: { type: String, required: true },
  totalBudget: { type: Number, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);
const Budget = mongoose.model("Budget", budgetSchema);

module.exports = { Expense, Budget };
