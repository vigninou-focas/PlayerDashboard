const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    trim: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isVerify: {
    type: Boolean,
    required: false,
    default: false,
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("Player", playerSchema);
