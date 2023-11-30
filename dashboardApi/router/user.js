const express = require("express");
// const { userDataValidateChainMethod, validateUserData } = require('../models/user')

const router = express.Router();
const authenticateToken = require("../controllers/middlewares/authenticateToken");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.js");

const { login, register, mail_verification } = require("../controllers/middlewares/authController.js");

router.get("/user", authenticateToken, getUsers);
router.get("/user/:userID", getUser);

router.post("/user", authenticateToken, createUser);
router.post("/user/login", login);
router.post("/user/register", register);

router.put("/user/:userID", authenticateToken, updateUser);

router.get("/mail_verification/:token", mail_verification)

router.delete("/user/:userID", authenticateToken, deleteUser);

module.exports = router;
