const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const user = await User.findOne({ emailAddress }).lean();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    delete user.password;
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
