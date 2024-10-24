const JwT = require("jsonwebtoken");
const colors = require("colors");
const { User } = require("../models");

const validateJwT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request.",
    });
  }

  try {
    const { uid } = JwT.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    // Check if the user exist in the DB
    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - User does not exist in the DB.",
      });
    }

    // If the user status is false, send an error
    if (!user.status) {
      return res.status(401).json({
        msg: "Invalid token - User status: false.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR".red, error);
    res.status(401).json({
      msg: "Invalid token.",
    });
  }
};

module.exports = {
  validateJwT,
};
