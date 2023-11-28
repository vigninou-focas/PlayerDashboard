const dotenv = require("dotenv").config({ path: "../../.env" });
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const path = require("path");
// const dotenvPath = path.resolve(__dirname, "../.env");
// require("dotenv").config({ path: dotenvPath });

const jwtSecret = process.env.JWT_SECRET;
// path.resolve(process.cwd(), '.env')

const login = async (req, res) => {
  console.log(req.body);
  // console.log(req);
  const loginUser = await User.findOne({
    email: req.body.email,
  });

  if (!loginUser) {
    return res.status(400).json({ error: "Utilisateur inexistant" });
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    loginUser.password
  );
  if (isPasswordCorrect) {
    const loginToken = jwt.sign({ email: loginUser.email }, jwtSecret, {
      expiresIn: "3600000",
    });
    // console.log(loginToken);
    return res.status(200).json(loginToken);

    // return res.status(200).json(loginUser._id);
  } else {
    return res
      .status(400)
      .json({ error: "Adresse e-mail ou mot de passe incorrect" });
  }
};

const register = async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email,
  });
  // console.log(req.body);
  if (existingUser) {
    console.log(existingUser);
    return res.status(500).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  mailToken = jwt.sign({ id: req.body.email }, jwtSecret, {
    expiresIn: "36000000",
  });
  // console.log(mailToken);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    profile: req.body.profile,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
    isVerify: req.body.isVerify,
    token: "",
  });
  console.log(newUser);
  try {
    const isSaved = await newUser.save();
    if (isSaved) {
      try {
        // console.log(myMailObjet);
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.MAILER_PASS,
          },
        });

        const Mail_object_Data = {
          from: process.env.EMAIL,
          to: newUser.email,
          subject: "Mail confirmation",
          text: `Suivez le lien suivant pour valider votre compte : http://${process.env.FINAL_HOST}:3000/verification/${newUser.token}`,
        };

        console.log(Mail_object_Data);
        try {
          const current_mail = await transporter.sendMail(Mail_object_Data);
          if (current_mail) {
            console.log("current_mail : " + current_mail);
            console.log("-------------------------------------Start mail_form");
            console.log(current_mail.messageId + " " + current_mail);
          }
          console.log(current_mail);
          console.log("-------------------------------------End mail_form");

          res.status(201).json({
            success:
              "user registred successefully, check your mail to valide your account",
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // const mailState = sendEmail(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const mail_verification = async (req, res) => {
  console.log("start verification");
  const verif_token = req.params.token;
  const verif_User = await User.findOne({
    token: verif_token,
  });
  console.log(verif_token);
  if (verif_User) {
    const updatedUser = {
      username: verif_User.username,
      email: verif_User.email,
      profile: verif_User.profile,
      password: hashedPassword,
      isAdmin: verif_User.isAdmin,
      isVerify: verif_User.isVerify,
      token: "",
    };
    console.log(updatedUser);
    // return res.status(200).json("User updated");

    const verif_User = await User.replaceOne(verif_User, updatedUser);
    if (verif_User) {
      console.log(verif_User);
      return res.status(200).send({ success: "user update successfuly" });
    }
  }
};

module.exports = {
  register,
  login,
  mail_verification,
};
