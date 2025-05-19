const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");
const authRoutes = require("./authRoutes");
const emailRoutes = require("./emailRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/test", (req, res) => {
  res.send("Server is running");
});
app.use("/", authRoutes);
app.use("/emails", emailRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
