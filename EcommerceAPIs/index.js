const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();
const PORTc = 5000;

// Connecting DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// Autrhentication routes
app.use("/api/auth", authRoute);

// User routes
app.use("/api/users", userRoute);

app.listen(process.env.PORT || PORTc, () => {
  console.log(`Backend is running on port ${PORTc}`);
});
