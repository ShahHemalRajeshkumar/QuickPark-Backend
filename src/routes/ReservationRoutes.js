const routes = require("express").Router();
const reservationController = require("../controllers/ReservationController");
const ReservationModel = require("../models/ReservationModel");

routes.post("/addreservation", reservationController.addReservation);
routes.get("/getallreservations", reservationController.getAllReservations);
routes.get("/getReservationsByUserId/:userId", reservationController.getReservationsByUserId);
routes.get("/getReservationById/:id", reservationController.getReservationById);
routes.put("/updateBooking/:id", reservationController.updateReservation );
module.exports = routes;
