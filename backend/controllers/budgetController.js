const {Expense, Budget} = require("../models/expenseModel");

const setBudget = async (req, res) => {
  const { totalBudget, month } = req.body;

  if (!totalBudget || !month) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let budget = await Budget.findOne({userId: req.user.userId, month })
    if (budget) {
        budget.totalBudget = totalBudget;
        await budget.save();
      } else {
        budget = new Budget({ userId: req.user.userId, month, totalBudget });
        await budget.save();
      }
      await budget.save();
    res.json({ message: "Budget set successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const budgetSummary = async (req, res)=>{
  const { month } = req.params;
  try {
    const budget = await Budget.findOne({userId: req.user.userId, month})
    const expense = await Expense.find({userId: req.user.userId,
      date: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) },
    })

    const totalSpent = expense.reduce((acc, exp) => acc + exp.amount, 0);
    const totalBudget = budget ? budget.totalBudget : 0;
    const remainingBalance = totalBudget - totalSpent;

    // Check if spent amount exceeds 80% of the budget
    let alertMessage = null;
    if (totalBudget > 0 && totalSpent >= 0.8 * totalBudget) {
      alertMessage = `Warning! You've spent ${((totalSpent / totalBudget) * 100).toFixed(1)}% of your budget.`;
    }

    res.json({ totalBudget, totalSpent, remainingBalance, alertMessage });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

const getBudget = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const budget = await Budget.findOne({ userId: req.user.userId, month });

    if (!budget) {
      return res.status(404).json({ message: "No budget found for this month" });
    }

    res.json({ totalBudget: budget.totalBudget });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {setBudget, budgetSummary, getBudget}