const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const upload = require("../middlewares/uploadMiddleware");
const factory = require("./handlersfactory");
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
exports.updateUser = factory.updateOne(User);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @desc  delete a spicefic user by id
// route DELETE /api/v1/user/:id
//access private
exports.deleteUser = factory.deleteOne(User);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
