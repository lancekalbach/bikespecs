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
    pdf: {
        type: String
    },
    imge: {
        type: String
    }
})

module.exports = mongoose.model("Bike", bikeSchema)