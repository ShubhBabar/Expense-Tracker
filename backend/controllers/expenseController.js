const {Expense} = require("../models/expenseModel");

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

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, amount, date } = req.body;
    const userId = req.user.userId;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.name = name || expense.name;
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

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
    const userId = req.user.userId;

    const expense = await Expense.findByIdAndDelete({ _id: id, userId });
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
  "Food", "Rent", "Travel", "Entertainment", "Education & Learning",
  "Investments", "Insurance", "Health & Fitness", "Shopping",
  "Personal Care", "Other"
];

const expenseSummary = async (req, res) => {
  try {
    const userId = req.user.id

    // Fetch total amount spent per category for the user
    const categoryBreakdown = await Expense.aggregate([
      { $match: { userId: userId } }, // Filter expenses by logged-in user
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" } // Sum amounts per category
        }
      }
    ]);

    // Convert aggregation result to a more usable format
    const categoryMap = categoryBreakdown.reduce((acc, entry) => {
      acc[entry._id] = entry.totalAmount;
      return acc;
    }, {});

    // Ensure all categories are present (default to 0 if no expense)
    const completeBreakdown = categories.map(category => ({
      category,
      totalAmount: categoryMap[category] || 0
    }));

    res.json(completeBreakdown);
  } catch (error) {
    console.error("Error in expenseSummary:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = { addExpense, getExpense, editExpense, deleteExpense, expenseSummary };
