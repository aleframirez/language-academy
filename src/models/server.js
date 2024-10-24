const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config.db");

const colors = require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      // Rutas de la aplicacion
      auth: "/api/auth",
      users: "/api/users",
    };

    // Connect to DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  // Connect to DB
  async connectDB() {
    await dbConnection();
  }

  // Middlewares
  middlewares() {
    // Cors
    this.app.use(cors());

    // Reading & parsing the body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
    // FileUpload - LoadFile
  }

  // Routes
  routes() {
    // Route paths
    this.app.use(this.paths.auth, require("../routes/auth.routes.js"));
    this.app.use(this.paths.users, require("../routes/user.routes.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in port:".underline, this.port.yellow);
    });
  }
}

module.exports = Server;
