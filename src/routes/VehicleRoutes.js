const routes = require("express").Router();
const vehicleController = require("../controllers/VehicleController");

routes.post("/addvehicle",vehicleController.addVehicle);
routes.get("/getallvehicles", vehicleController.getAllVehicles);
routes.get("/getVehicleByUserId/:userId", vehicleController.getAllVehiclesByUserId);

module.exports = routes;