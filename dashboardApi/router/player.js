const express = require("express");
const authenticateToken = require("../controllers/middlewares/authenticateToken");
const router = express.Router();
const {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/player.js");

router.get("/player", authenticateToken, getPlayers);

router.get("/player/:playerID", getPlayer);

router.post("/player", createPlayer);

router.put("/player/:playerID", updatePlayer);

router.delete("/player/:playerID", deletePlayer);

module.exports = router;
