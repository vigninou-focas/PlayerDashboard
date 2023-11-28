const Player = require("../models/player");

// Get all players
const getPlayers = async (req, res) => {
  const players = await Player.find();
  return res.status(200).json(players);
};

// Get a player by ID
const getPlayer = async (req, res) => {
  console.log("call of :---> get One player's function");
  const playerID = req.params.playerID;
  const player = await Player.findOne({ _id: playerID });
  if (!player) {
    return res.status(404).send("Player not found");
  }
  console.log(player);
  return res.status(200).json(player);
};

// Create a  new player
const createPlayer = async (req, res) => {
  parseJerseyNumber = parseInt(req.body.jerseyNumber);
  console.log(typeof parseJerseyNumber);
  console.log(req.body);
  const newPlayer = new Player({
    playerName: req.body.playerName,
    jerseyNumber: parseJerseyNumber,
    position: req.body.position,
    playerImage: req.body.playerImage,
    // performances: req.body.performances,
  });

  console.log(newPlayer);
  try {
    newPlayer.save().then((newPlayer) => {
      return res.status(201).json(newPlayer);
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE a  new player
const updatePlayer = async (req, res) => {
  const playerID = req.params.playerID;
  const foundedPlayer = await Player.findOne({ _id: playerID });
  if (foundedPlayer) {
    const updatedPlayer = {
      playerName: req.body.playerName,
      jerseyNumber: req.body.jerseyNumber,
      position: req.body.position,
      playerImage: req.body.playerImage,
      //   performances: req.body.performances,
    };
    console.log(updatedPlayer);

    const updateFinished = await Player.replaceOne(
      foundedPlayer,
      updatedPlayer
    );
    if (updateFinished) {
      console.log(updateFinished);
      return res.status(200).json("Player updated");
    }
  }
};

// DELETE a player by ID
const deletePlayer = async (req, res) => {
  const playerID = req.params.playerID;
  const isDelete = await Player.findByIdAndRemove({ _id: playerID });
  if (isDelete) {
    return res.status(200).json("player deleted");
  }
};

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
