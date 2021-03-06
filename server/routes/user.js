const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { surfactants, alcohols, parabens, fragrances } = require("../DefaultFilters");

let User = require("../models/user");
let Filter = require("../models/filter");

const secret = process.env.JWT_SECRET;

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "3h" }
    );
    res.status(200).json({ userId: existingUser._id, username: existingUser.username, token: token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

router.route("/register").post(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await Filter.create({ name: "Surfactants", ingrList: surfactants, userId: result._id, visibility: true, isDefault: true });
    await Filter.create({ name: "Alcohols", ingrList: alcohols, userId: result._id, visibility: true, isDefault: true });
    await Filter.create({ name: "Fragrances", ingrList: fragrances, userId: result._id, visibility: true, isDefault: true });
    await Filter.create({ name: "Parabens", ingrList: parabens, userId: result._id, visibility: true, isDefault: true });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "3h",
    });
    res.status(201).json({token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

module.exports = router;
