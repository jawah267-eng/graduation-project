const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.SingUp = asyncHandler(async (req, res, next) => {
  // 1-create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  console.log("JWT SECRET:", process.env.JWT_SECRET_KEY);
  console.log("JWT EXPIRE:", process.env.JWT_EXPIRE_TIME);
  //2- Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  res.status(201).json({ data: user, token });
});
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// exports.SingUp = async (req, res, next) => {
//   try {
//     console.log("1 - entered signup");
//     console.log("next type:", typeof next);

//     const user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     console.log("2 - user created");

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: process.env.JWT_EXPIRE_TIME,
//     });

//     console.log("3 - token created");

//     return res.status(201).json({
//       data: user,
//       token,
//     });
//   } catch (err) {
//     console.log("🔥 REAL ERROR:");
//     console.error(err);

//     return next(err);
//   }
// };
