const isAdminRole = async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "You must validate the token before you can validate the role",
    });
  }

  const { role } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "Only the Admin can do this",
    });
  }

  next();
};

const haveRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "You must validate the token before you can validate the role",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of this roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  haveRole,
};
