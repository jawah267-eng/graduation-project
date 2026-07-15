const UserPlant = require("../models/userplants");

exports.createUserPlant = async (data) => {
  return await UserPlant.create(data);
};
