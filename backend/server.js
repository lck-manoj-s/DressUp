require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const combinationRoutes = require("./routes/combinations");
const geminiRoutes = require("./routes/Gemini")
const colorRoutes = require("./routes/Colors")
const imageColorRoutes = require("./routes/ImageColors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/combinations", combinationRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/images/colors", imageColorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
