const UserPlant = require("../models/userPlant");

exports.createUserPlant = async (data) => {
  return await UserPlant.create(data);
};
