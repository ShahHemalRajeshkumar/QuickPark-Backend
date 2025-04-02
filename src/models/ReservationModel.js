const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
  //   availableSpaces: {
  //     type: Number,
  //     required: true
  // },
  
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  //   stateId:{
  //     type: Schema.Types.ObjectId,
  //     ref: 'State',
  //     required: true
  // },
  // cityId:{
  //     type: Schema.Types.ObjectId,
  //     ref: 'City',
  //     required: true
  // },
  // areaId:{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Area',
  //     required: true
  // },
  // address: {
  //     type: String,
  //     required: true
  // },
    parkingId: {
      type: Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required:true
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      required: true,
    },
    // amountPaid: {
    //   type: Number,
    //   required: true,
    // },
    securityAmountPaid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
