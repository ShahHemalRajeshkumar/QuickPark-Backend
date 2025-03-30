const reservationModel = require("../models/ReservationModel");


const addReservation = async (req, res) => {
  try {
    const savedReservation = await reservationModel.create(req.body);
    //update..
    res.status(201).json({
      message: "Reservation added successfully",
      data: savedReservation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationModel
      .find()
      .populate("userId parkingId vehicleId");

    if (reservations.length === 0) {
      res.status(404).json({ message: "No reservations found" });
    } else {
      res.status(200).json({
        message: "Reservations retrieved successfully",
        data: reservations,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReservationsByUserId = async (req, res) => {
  try {
    const reservations = await reservationModel
      .find({ userId: req.params.userId })
      .populate("userId parkingId");

    if (reservations.length === 0) {
      res.status(404).json({ message: "No reservations found for this user" });
    } else {
      res.status(200).json({
        message: "Reservations retrieved successfully",
        data: reservations,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation updated successfully",
      data: updatedReservation,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while updating reservation",
      error: err.message,
    });
  }
};
const getReservationById = async (req, res) => {
  try {
    const reservation = await reservationModel.findById(req.params.id).populate("userId parkingId");
    
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({
      message: "Reservation retrieved successfully",
      data: reservation,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching reservation",
      error: err.message,
    });
  }
};

module.exports = { addReservation, getAllReservations, getReservationsByUserId , updateReservation, getReservationById};
