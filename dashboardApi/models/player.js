const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  jerseyNumber: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  playerImage: {
    type: String,
    required: true,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
});

module.exports = mongoose.model("Player", playerSchema);
