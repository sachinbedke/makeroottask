const mongoose = require("mongoose")

const tempSchema = new mongoose.Schema({
    templeName: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    contactPerson: {
        type: String,
        // required: true
    },
    phoneNumber: {
        type: Number,
        // required: true
    },
    altPhoneNumber: {
        type: Number,
        // required: true
    },
    templeDetails: {
        type: String,
        // required: true
    },
    tempImage: {
        type: String,
        // required: true
    },
    tempVideo: {
        type: String,
        // required: true
    },
},
    { timestamps: true })

module.exports = mongoose.model("temple", tempSchema)