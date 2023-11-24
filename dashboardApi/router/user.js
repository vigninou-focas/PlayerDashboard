const express = require("express");
// const { userDataValidateChainMethod, validateUserData } = require('../models/user')

const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.js");

const { login, register, mail_verification } = require("../controllers/authController.js");

router.get("/user", getUsers);
router.get("/user/:userID", getUser);

router.post("/user", createUser);
router.post("/user/login", login);
router.post("/user/register", register);

router.put("/user/:userID", updateUser);

router.get("mail_verification/:token", mail_verification)

router.delete("/user/:userID", deleteUser);

module.exports = router;
