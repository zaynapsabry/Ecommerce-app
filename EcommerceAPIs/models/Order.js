const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, requried: true },
    address: { type: Object, required: true }, // After purchasing the stripe library is going to return an object
    status: { type: String, default: "pending" }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
