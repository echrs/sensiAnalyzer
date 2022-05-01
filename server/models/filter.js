const { Schema, mongoose } = require("mongoose");

const filterSchema = new Schema({
  name: { type: String, required: true },
  ingrList: { type: Array, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  default: { type: Boolean, required: true },
  visibility: {type: Boolean, required: true }
});

const Filter = mongoose.model("Filter", filterSchema, "filters");

module.exports = Filter;
