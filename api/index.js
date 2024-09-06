const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const Transaction = require("./models/transaction");
app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO);
  const { price, name, desc, datetime } = req.body;

  const transaction = await Transaction.create({ price, name, desc, datetime });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO);
  const transactions = await Transaction.find();
  res.json(transactions);
});
app.listen(4040);
