const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientSchema = {
  rating: String,
  name: String,
  description: String,
  filter: Boolean,
  altName: String,
};

const Ingredient = mongoose.model(
  "Ingredient",
  ingredientSchema,
  "ingredients"
);

module.exports = Ingredient;
