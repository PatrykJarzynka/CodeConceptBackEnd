const mongoose = require("mongoose");
const { Schema } = mongoose;

const userData = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  money: {
    type: Number,
    required: [true, "Amount of money is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
});

const Data = mongoose.model("data", userData);

module.exports = Data;
