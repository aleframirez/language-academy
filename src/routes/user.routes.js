// Rutas de usuario
const { Router } = require("express");
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
} = require("../controller");

const router = Router();

// GET Users
router.get("/", getUsers);

// POST Users
router.post("/", postUsers);

// UPDATE Users
router.put("/:id", updateUsers);

// DELETE Users
router.delete("/:id", deleteUsers);

module.exports = router;
