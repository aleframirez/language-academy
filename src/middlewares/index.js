// Archivo barril de Middlewares
const { validateFields } = require("./validate-fields");
const { validateJwT } = require("./validate-jwt");
const { isAdminRole, haveRole } = require("./validate-role");

module.exports = {
  validateFields,
  validateJwT,
  isAdminRole,
  haveRole,
};
