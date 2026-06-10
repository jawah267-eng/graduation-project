const UserPlant = require("../models/userPlant");

exports.getUserPlants = async (req, res) => {
const data = await UserPlant.find({ user: req.user.id })
    .populate("plant"); // 

res.json(data);
};