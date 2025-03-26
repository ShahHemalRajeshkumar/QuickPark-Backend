const parkingModel = require("../models/ParkingModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

const addParking = async (req, res) => {
    try {
      const savedParking = await parkingModel.create(req.body);
      res.status(201).json({
        message: "Parking added successfully",
        data: savedParking,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const getAllParkings = async (req, res) => {
    try {
      const parkings = await parkingModel.find().populate("stateId cityId areaId userId");
      if (parkings.length === 0) {
        res.status(404).json({ message: "No parkings found" });
      } else {
        res.status(200).json({
          message: "Parking found successfully",
          data: parkings,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getAllParkingsByUserId = async (req, res) => {

    try{
      const parkings = await parkingModel.find({userId:req.params.userId}).populate("stateId cityId areaId userId");

      if (parkings.length === 0){
        res.status(404).json({ message: "No parking found" });
      } else {
        res.status(200).json({
          message: "Parking found successfully",
          data: parkings,
        });
      }
    }catch(err) {
      res.status(500).json({message: err.message});
    }
  };

  const addParkingwithFile = async (req,res) => {
    upload(req,res, async (err) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else{
        console.log(req.file)
        const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        console.log(cloundinaryResponse);
        console.log(req.body);

        req.body.parkingURL = cloundinaryResponse.secure_url
        const savedParking = await parkingModel.create(req.body);

        res.status(200).json({
          message: "parking saved successfully",
          data: savedParking
        });
      }
    });
  };

  const updateParking = async (req, res) => {

    try{
      const updateParking = await parkingModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "parking updated successfully",
        data: updateParking,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update parking",
        err: err,
      });
    }
  };

  const getParkingById = async(req, res) => {
    try{
      const parking = await parkingModel.findById(req.params.id);
      if(!parking) {
        res.status(404).json({ message: "No parking found"});
      } else {
        res.status(200).json({
          message: "Parking found successfully",
          data: parking,
        });
      }
    }catch (err){
      res.status(500).json({ message: err.message });
    }
  }
  const getParkingByAreaId = async (req, res) => {
    try {
      const parking = await parkingModel.find({ areaId: req.params.areaId });
      res.status(200).json({
        message: "parking found",
        data: parking,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  };
  module.exports = { addParking, getAllParkings, addParkingwithFile, getAllParkingsByUserId, getParkingById, updateParking, getParkingByAreaId };