const express = require("express");
const connectDB = require("./config/db");
const combinationRoutes = require("./routes/combinations");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/combinations", combinationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));