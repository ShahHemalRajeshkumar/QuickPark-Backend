const vehicleModel = require("../models/VehicleModel");

const addVehicle = async (req, res) => {
  try {
    const savedVehicle = await vehicleModel.create(req.body);
    res.status(201).json({
      message: "Vehicle added successfully",
      data: savedVehicle,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find().populate("userId");
    if (vehicles.length === 0) {
      res.status(404).json({ message: "No vehicles found" });
    } else {
      res.status(200).json({
        message: "Vehicles retrieved successfully",
        data: vehicles,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllVehiclesByUserId = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find({userId: req.params.userId }).populate("userId");

    if (vehicles.length === 0) {
      res.status(404).json({ message: "No vehicles found for this user" });
    } else {
      res.status(200).json({
        message: "Vehicles retrieved successfully",
        data: vehicles,
      });
    }
  } catch (err) {
    console.error("Error in getAllVehiclesByUserid:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addVehicle, getAllVehicles, getAllVehiclesByUserId };
