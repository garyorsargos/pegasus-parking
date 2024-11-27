const { Schema, model } = require("mongoose");

//This is all the Garage information that will be store
const GarageSchema = new Schema({
    lat: {
        type:Number,
        required: true,
    },
    lng: {
        type:Number,
        required: true,
    },
    name: {
        type:String,
        unique:true,
        required: true,
    },
    permit: {
        type:[String],
        required: true,
    },
});

module.exports = model("Garages", GarageSchema, "Garages");