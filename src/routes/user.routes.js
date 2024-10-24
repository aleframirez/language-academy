// Rutas de usuario
const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  postRole,
} = require("../controller");

// Helpers
const {
  validEmail,
  validRole,
  validUsername,
  existUserId,
} = require("../helpers");

// Middlewares
const {
  validateFields,
  validateJwT,
  isAdminRole,
  haveRole,
} = require("../middlewares");

const router = Router();

// GET Users
router.get("/", getUsers);

// POST Roles
router.post("/role", postRole);

// POST Users
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty().escape(),
    check("username", "Username is required").not().isEmpty().escape(),
    check("username").custom(validUsername),
    check(
      "password",
      "The password must contain at least 8 characters and 1 special character"
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).*$/)
      .escape(),
    check("email", "Invalid email").isEmail().normalizeEmail(),
    check("email").custom(validEmail),
    check("role").custom(validRole),
    validateFields,
  ],
  postUsers
);

// UPDATE Users
router.put(
  "/:id",
  [
    check("name", "Name is required").not().isEmpty().escape(),
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existUserId),
    check("role").custom(validRole),
    validateFields,
  ],
  updateUsers
);

// DELETE Users
router.delete(
  "/:id",
  [
    validateJwT,
    isAdminRole, // It force you to be an Admin
    haveRole("ADMIN_ROLE"), // It can be any of the roles that we give here (In the future if we have more just add here)
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
