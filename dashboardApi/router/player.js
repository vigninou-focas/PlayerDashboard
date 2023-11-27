const express = require("express");
const router = express.Router();
const authenticateToken = require("../controllers/middlewares/authenticateToken");
const {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/player.js");

router.get("/player", authenticateToken, getPlayers);

router.get("/player/:playerID", authenticateToken, getPlayer);

router.post("/player", authenticateToken, createPlayer);

router.put("/player/:playerID", authenticateToken, updatePlayer);

router.delete("/player/:playerID", authenticateToken, deletePlayer);

module.exports = router;
