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
  return res.status(200).json(player);
};

// Create a  new player
const createPlayer = async (req, res) => {
  console.log(req.body);
  const newPlayer = new Player({
    name: req.body.name,
    number: req.body.number,
    position: req.body.position,
    image: req.body.image,
    // performances: req.body.performances,
  });

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
      name: req.body.name,
      number: req.body.number,
      position: req.body.position,
      image: req.body.image,
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
