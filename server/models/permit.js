const { Schema, model } = require("mongoose");

//This is all the Permit information that will be store
const PermitSchema = new Schema({
    permit: {
        type:String,
        required: true,
    },
    licence: {
        type:String,
        unique:true,
        required: true,
    },
    expiration: {
        type:String,
        require: true,
    },
});

module.exports = model("Permits", PermitSchema, "Permits");