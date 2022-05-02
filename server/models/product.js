const { Schema, mongoose } = require("mongoose");

const productSchema = new Schema({
    name: { type: String, required: true },
    ingrList: { type: Array, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
