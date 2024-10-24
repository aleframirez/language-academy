const JwT = require("jsonwebtoken");
const colors = require("colors");

const generateJwT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    JwT.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log("ERROR".red, err);
          reject("Could not add token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwT,
};
