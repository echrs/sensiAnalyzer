const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = {
  name: String,
  email: String,
  password: String,
  filters: Array,
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
