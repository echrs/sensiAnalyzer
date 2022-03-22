const mongoose = require("mongoose");

const filterSchema = {
  name: String,
  default: Boolean,
  ingrList: Array,
};

const Filter = mongoose.model("Filter", filterSchema, "filters");

module.exports = Filter;
