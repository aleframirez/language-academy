const { request, response } = require("express");
const colors = require("colors");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateJwT, googleVerify } = require("../helpers");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Check if the email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        msg: "No user with this email.",
      });
    }

    // If the user status is false, send an error
    if (!user.status) {
      return res.status(401).json({
        msg: "This user has been suspended.",
      });
    }

    // Check for the password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        msg: "Password incorrect",
      });
    }

    // Generate JwT
    const token = await generateJwT(user.id);

    res.status(200).json({
      msg: "Login Ok",
      user,
      token,
    });
  } catch (error) {
    console.log("ERROR".red, error);
    return res.status(500).json({
      msg: "Talk to the Administrator.",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    // If there is no user with that email, we create it.
    if (!user) {
      const data = {
        name,
        email,
        password: ":D",
        img,
        role: "STUDENT_ROLE",
        google: true,
      };

      user = new User(data);
      await user.save();
      // sendEmail(name, email); // Cuando se agregue nodemailer
    }

    // If the user status is false, send an error
    if (!user.status) {
      return res.status(401).json({
        msg: "Talk to administrator, user blocked",
      });
    }

    // Generate JwT
    const token = await generateJwT(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "The token could not be verified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
