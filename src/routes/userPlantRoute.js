const express = require("express");
const router = express.Router();

const userPlantController = require("../controllers/userplantcontroller");

router
  .route("/")
  .post(userPlantController.createUserPlant)
  .get(userPlantController.getAllUserPlants);

router
  .route("/:id")
  .get(userPlantController.getUserPlant)
  .patch(userPlantController.updateUserPlant)
  .delete(userPlantController.deleteUserPlant);
module.exports = router;
