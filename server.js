const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/user");
const authenticate = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing JSON bodies

// Replace with your real MongoDB URI in .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection failed ❌", err));

// HOME route (public)
app.get("/", (req, res) => {
  res.send("Welcome to the backend 🚀");
});

// SIGNUP route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to DB
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully 🎉" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    // Sign JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, msg: "Logged in successfully 🔓" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// PROTECTED route
app.get("/overview", authenticate, (req, res) => {
  res.send("You are viewing a protected dashboard 🛡️");
});

app.get("/patients", authenticate, (req, res) => {
  res.send("You are viewing a protected dashboard 🛡️");
});

app.get("/staffList", authenticate, (req, res) => {
  res.send("You are viewing a protected dashboard 🛡️");
});

app.get("/calender", authenticate, (req, res) => {
  res.send("You are viewing a protected dashboard 🛡️");
});

app.get("/addNew", authenticate, (req, res) => {
  res.send("You are viewing a protected dashboard 🛡️");
});

app.get("/settings", authenticate, (req, res) => {
  res.send("You are viewing a protected dashboard 🛡️");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
