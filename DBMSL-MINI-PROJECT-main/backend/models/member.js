const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memberSchema = new Schema({
    Name: {
        type: String,
        required: true
    },

    Aadhaar_ID: {
        type: Number,
        required: true
    },

    Phone_no: {
        type: Number,
        required: true
    },

    Address: {
        type: String,
        required: true
    },

    NGO_ID: {
        type: Number,
        default: 0
    },

    p_ID: {
        type: Number,
        default: 0
    }
}, {timestamps: true}
)

module.exports = mongoose.model('Mem', memberSchema)