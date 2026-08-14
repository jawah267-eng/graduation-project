const express = require("express");
const router = express.Router();
const Authservice = require("../services/authService");
const userPlantController = require("../controllers/userplantcontroller");

router
  .route("/")
  .post(Authservice.protect, userPlantController.createUserPlant)
  .get(Authservice.protect, userPlantController.getAllUserPlants);

router
  .route("/:id")
  .get(Authservice.protect, userPlantController.getUserPlant)
  .patch(Authservice.protect, userPlantController.updateUserPlant)
  .delete(Authservice.protect, userPlantController.deleteUserPlant);

module.exports = router;
