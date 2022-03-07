const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const filterSchema = {
  name: String,
  default: Boolean,
  ingrList: Array,
};

const Filter = mongoose.model("Filter", filterSchema, "filters");

module.exports = Filter;
