const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// CORS Configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

const port = process.env.PORT || 5000;
const dbConnection = process.env.DB_CONNECTION_STRING;
// const dbConnection = "mongodb://127.0.0.1:27017/player_db";
const routes_user = require("./router/user");
const routes_player = require("./router/player");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect(dbConnection)
  .then(console.log("----> Player connected succesfully"))
  .catch((error) => {
    console.log("connexion refused : " + error);
  });

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(routes_user);
app.use(routes_player);
app.get("/", (req, res) => {
  res.send("Welcome player!");
});

app.use("/user", (req, res) => {
  console.log(req);
  routes_user;
});
app.use("/player", (req, res) => {
  console.log(req);
  routes_player;
});

app.listen(port, () => {
  console.log(`----> Player listen on port : ${port}`);
});
