const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.SingUp = asyncHandler(async (req, res, next) => {
  // 1-create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //2- Generate token
  const token = createToken(user._id);
  // 3- Send response
  res.status(201).json({
    data: user,
    token,
  });
});

////////////////////////////////////////////////////////////////////////
exports.LogIn = asyncHandler(async (req, res, next) => {
  // 1- check if password and email  in the body (validation)
  //2-check if user exist & password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || (await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password"));
  }
  //3- Generate token
  const token = createToken(user._id);

  //4- send response  to client side
  res.status(200).json({ data: user, token });
});
