const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
module.exports = TransactionModel;
