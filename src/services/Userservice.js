const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const upload = require("../middlewares/uploadMiddleware");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const factory = require("./handlersfactory");
// export image
exports.uploadimage = upload.single("profileImg");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  //   await sharp(req.file.buffer)
  //     .resize(600, 600)
  //     .toFormat("jpeg")
  //     .jpeg({ quality: 90 })
  //     .toFile(`upload/user/${filename}`);

  // save the image in db
  req.body.profileImg = filename;
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
