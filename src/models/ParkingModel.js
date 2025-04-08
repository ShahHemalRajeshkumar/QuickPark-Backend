const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
   parkingname: {
        type: String,
        required: true,
        unique: true
    },
    stateId:{
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    cityId:{
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    areaId:{
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalSpaces: {
        type: Number,
        required: true
    },
    availableSpaces: {
        type: Number,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    parkingType: {
        type: String,
        enum: ["Open", "Covered", "Underground", "Multi-level"],
        required: true
    },
     parkingURL:{
         type: String,
         required: true
     },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        // required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Parking', parkingSchema);