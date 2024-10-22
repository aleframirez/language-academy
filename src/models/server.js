const express = require("express");
const cors = require("cors");
const colors = require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      // Rutas de la aplicacion
    };

    // Connect to DB

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  // Connect to DB

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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in port:".underline, this.port.yellow);
    });
  }
}

module.exports = Server;