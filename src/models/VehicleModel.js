const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    registrationNumber: {
      type: String,
      required: true,
      //unique: true
    },
    vehicleType: {
      enum:['2Wheeler','4Wheeler','SUV'],
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
