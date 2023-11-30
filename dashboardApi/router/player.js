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

// router.get("/player",authenticateToken, getPlayers);

// router.get("/player/:playerID", getPlayer);

// router.post("/player", createPlayer);

// router.put("/player/:playerID", updatePlayer);

// router.delete("/player/:playerID", deletePlayer);

module.exports = router;
