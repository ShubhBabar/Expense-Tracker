const mongoose = require("mongoose");
const { Expense } = require("../models/expenseModel");

const addExpense = async (req, res) => {
  const { name, amount, category, date } = req.body;

  try {
    if (!name || !amount || !category || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: "Amount must be a valid positive number" });
    }

    const newExpense = await Expense.create({
      name,
      amount: parsedAmount,
      category,
      date: new Date(date),
      userId: req.user.userId,
    });

    res.status(201).json({ message: "Expense added successfully!", expense: newExpense });
  } catch (error) {
    console.error("Error in addExpense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.error("Fetch Expenses Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Expense ID" });
    }

    const userId = req.user.userId;
    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    console.error("Fetch Expense Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Expense ID" });
    }

    const { name, category, amount, date } = req.body;
    const userId = req.user.userId;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (amount !== undefined) {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ error: "Amount must be a valid positive number" });
      }
      expense.amount = parsedAmount;
    }

    if (name) expense.name = name;
    if (category) expense.category = category;
    if (date) expense.date = new Date(date);

    await expense.save();
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.error("Update Expense Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Expense ID" });
    }

    const userId = req.user.userId;
    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const categories = [
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
];

const expenseSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const categoryBreakdown = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfMonth, $lte: endOfMonth }, // Filter for current month
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const categoryMap = categoryBreakdown.reduce((acc, entry) => {
      acc[entry._id] = entry.totalAmount;
      return acc;
    }, {});

    const completeBreakdown = categories.map((category) => ({
      category,
      totalAmount: categoryMap[category] || 0,
    }));

    res.status(200).json(completeBreakdown);
  } catch (error) {
    console.error("Error in expenseSummary:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// Get Monthly Expenses for All Months
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Get Monthly Expenses for All Months
const monthlyData = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const monthlyData = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month
    ]);

    res.json(
      monthlyData.map((data) => ({
        month: data._id.month,
        year: data._id.year,
        amount: data.amount,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly expenses", error });
  }
};


// Get Category-wise Expenses (Current Month Only)
const categoryData = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const categoryData = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          value: { $sum: "$amount" },
        },
      },
    ]);

    res.json(categoryData.map((data) => ({ category: data._id, value: data.value })));
  } catch (error) {
    res.status(500).json({ message: "Error fetching current month category-wise expenses", error });
  }
};

// Get Highest Expenses (Top 5 of Current Month)
const highestExpenses = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const highestExpenses = await Expense.find({
      userId,
      date: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      },
    })
      .sort({ amount: -1 }) // Highest to lowest
      .limit(7)
      .select("category amount");

    res.json(highestExpenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching highest expenses for current month", error });
  }
};
module.exports = {
  addExpense,
  getExpense,
  editExpense,
  deleteExpense,
  expenseSummary,
  getExpenseById,
  highestExpenses,
  categoryData,
  monthlyData
};
