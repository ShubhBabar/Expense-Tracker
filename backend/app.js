const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require("./configs/db");
const userRoute = require("./routes/userRoute")
const expenseRoute = require("./routes/expenseRoutes")

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors());

app.use("/user", userRoute)
app.use("/expense", expenseRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));