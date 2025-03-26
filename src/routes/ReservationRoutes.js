const routes = require("express").Router();
const reservationController = require("../controllers/ReservationController");

routes.post("/addreservation", reservationController.addReservation);
routes.get("/getallreservations", reservationController.getAllReservations);
routes.get("/getReservationsByUserId/:userId", reservationController.getReservationsByUserId);

module.exports = routes;
