const { validationResult } = require("express-validator");
//@desc findsthe validtion errors in this  request and wraps them in a object with handy functions
const validatormiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatormiddleware;
