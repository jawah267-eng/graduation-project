const DiseasePlant = require("../models/diseas_plant");

const createDiseasePlant = async (data) => {
  return await DiseasePlant.create(data);
};

module.exports = {
  createDiseasePlant,
};
