const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const path = require("path");
dotenv.config();
const PORTc = 5000;

// Connecting DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

app.use(cors()); //used for payment

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT || PORTc, () => {
  console.log(`Backend is running on port ${PORTc}`);
});
