// Archivo barril de Controlers

// Users
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  postRole,
} = require("./user.js");

// Auth
const { login, googleSignIn } = require("./auth.js");

module.exports = {
  // Users
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  postRole,

  // Auth
  login,
  googleSignIn,
};
