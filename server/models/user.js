const mongoose = require("mongoose");

const userSchema = {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  filters: Array,
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;