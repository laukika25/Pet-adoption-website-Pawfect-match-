const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petsSchema = new Schema({
    Name: {
        type: String,
        required: true
    },

    Animaltype: {
        type: String,
        required: true
    },

    Age: {
        type: Number,
        required: true
    },

    Gender: {
        type: String,
        required: true
    },

    NGO_ID: {
        type: Number,
        required: true
    },

    p_ID: {
        type: Number,
        required: true
    }
}, {timestamps: true}
)

module.exports = mongoose.model('Pets', petsSchema)

