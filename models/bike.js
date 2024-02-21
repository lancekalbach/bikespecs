const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const bikeSchema = new Schema({
    year: {
        type: Number,
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
    },
    bolt: {
        type: String,
    },
    location: {
        type: String,
    },
    torque: {
        type: Number,
    },
    imge: {
        type: String
    }
})

module.exports = mongoose.model("Bike", bikeSchema)