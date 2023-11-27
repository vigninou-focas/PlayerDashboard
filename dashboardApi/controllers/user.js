const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  console.log("call of get One user's function");
  const userID = req.params.userID;
  const user = await User.findOne({ _id: userID });
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  console.log("start creation");
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    profile: req.body.profile,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
    isVerify: req.body.isVerify,
    token: "",
  });
  await newUser.save();

  res.status(201).json(newUser);
  console.log(res);
};
const updateUser = async (req, res) => {
  const userID = req.params.userID;
  const foundedUser = await User.findOne({ _id: userID });
  if (foundedUser) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedUser = {
      username: req.body.username,
      email: req.body.email,
      profile: req.body.profile,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
      isVerify: req.body.isVerify,
      token: "",
    };
    console.log(updatedUser);
    // return res.status(200).json("User updated");

    const updateFinished = await User.replaceOne(foundedUser, updatedUser);
    if (updateFinished) {
      console.log(updateFinished);
      return res.status(200).send({ success: "user update successfuly" });
    }
  }
};

const deleteUser = async (req, res) => {
  const userID = req.params.userID;
  const isDelete = await User.findByIdAndRemove({ _id: userID });
  if (isDelete) {
    return res.status(200).json("user deleted");
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
