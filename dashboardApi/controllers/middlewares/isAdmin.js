// // middleware/isAdmin.js
// const User = require("../../models/user");

// const isAdmin = (req, res, next) => {
//   const user = req.user;

//   if (user && user.isAdmin) {
//     next();
//   } else {
//     return res
//       .status(403)
//       .send("Accès refusé. Vous n'êtes pas un administrateur.");
//   }
// };

// module.exports = isAdmin;
