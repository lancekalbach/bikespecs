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
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length < 10 * 1024 * 1024
            },
            message: props => `${props.value} exceeds the file size limit of 10MB!`,
        },
    },
    imge: {
        type: String,
    }
})

module.exports = mongoose.model("Bike", bikeSchema)