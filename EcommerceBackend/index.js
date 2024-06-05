const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
dotenv.config();

//cors update
app.use(cors({ origin: process.env.ORIGIN }));

app.use(express.json());

app.use("/", authRoutes);
app.use("/products", productRoutes);
app.use("/userDetails", userDetailsRoutes);


//mongo URI update
const uri = process.env.MONGO_URI;
mongoose.connect(uri);



app.get("/", async (request, response) => {
  response.status(200);
  response.send("Welcome to FashionFit server,Enjoy our Services");
});

app.listen(7000, () => {
  console.log(`Server Running at http://localhost:${7000}`);
});

//module.exports = app;
