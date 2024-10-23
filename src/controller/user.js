const { request, response } = require("express");
const bcrypt = require("bcrypt");
const colors = require("colors");
const { User } = require("../models");

// GET Users
const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    msg: "GET /api/users - Controller",
    total,
    users,
  });
};

// POST User
const postUsers = async (req = request, res = response) => {
  // Get the data we want to use
  const { name, username, email, password, role } = req.body;

  // Create new User
  const user = new User({ name, username, email, password, role });

  // Encrypt the password with bcrypt
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  user.username = `@${username}`;

  // Save in the DB
  await user.save();

  res.status(201).json({
    msg: "POST /api/users - Controller",
    user,
  });
};

const updateUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, username, google, email, ...remainder } = req.body;

  // Explained in detail in the documentation
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).*$/;

  if (password) {
    // We check that it meets the requirements
    if (!regex.test(test)) {
      return res.status(204).json({ error: "Invalid Password" });
    }

    // If everything is all right
    const salt = bcrypt.genSaltSync();
    remainder.password = bcrypt.hashSync(password, salt);
  }

  // Update User
  const user = await User.findByIdAndUpdate(id, remainder);

  res.status(202).json({
    msg: "PUT /api/users - Controller",
    user,
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;

  // Update the status to false
  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(202).json({
    msg: "DELETE /api/users - Controller",
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
};
