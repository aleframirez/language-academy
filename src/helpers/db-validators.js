const { User, Role } = require("../models");

// Check if the email already exist
const validEmail = async (email = "") => {
  const existantEmail = await User.findOne({ email });
  // console.log(existantEmail, email);

  if (existantEmail) {
    throw new Error(`Email: ${email}, is already in use.`);
  }
};

// Check if the username already exist
const validUsername = async (username = "") => {
  const existantUsername = await User.findOne({ username });
  // console.log(existantUsername);

  if (existantUsername) {
    throw new Error(`Username: ${username}, is already in use.`);
  }
};

// Check if the role exist
const validRole = async (role = "") => {
  const existantRole = await Role.findOne({ role });

  if (!existantRole) {
    throw new Error(`Role: ${role}, is not registered in de database.`);
  }
};

// Check if the user exist
const existUserId = async (id) => {
  const existantUserId = await User.findById(id);

  if (!existantUserId) {
    throw new Error("The User Id does not exist.");
  }
};

module.exports = {
  validEmail,
  validRole,
  validUsername,
  existUserId,
};
