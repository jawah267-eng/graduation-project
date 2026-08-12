const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const upload = require("../middlewares/uploadMiddleware");
const factory = require("./handlersfactory");
const apierror = require("../utils/apiError");
const bcrypt = require("bcryptjs");
// Upload profile image
exports.uploadimage = upload.single("profileImg");

// Get Cloudinary image URL and save it in request body
exports.setProfileImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.profileImg = req.file.path;
  }

  next();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @desc  Get list of users
// route GET /api/v1/users
//access private
exports.getUsers = factory.getAll(User);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// @desc  Get a spicefic user by id
// route GET /api/v1/user/:id
//access private
exports.getUser = factory.getOne(User);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc  create user
// route POST /api/v1/users
//access private
exports.createUser = factory.createOne(User);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @desc  update a spicefic user
// route UPDATE /api/v1/users/:id
//access private
exports.updateuser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
    },
    {
      new: true,
    },
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: document,
  });
});
/////////////////////////////////////////////////////////////////
//Update password

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash("req.body.password", 12),
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: document,
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @desc  delete a spicefic user by id
// route DELETE /api/v1/user/:id
//access private
exports.deleteUser = factory.deleteOne(User);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
