const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const combinationRoutes = require("./routes/combinations");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/combinations", combinationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
