const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  NGO_name: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  NGO_ID: {
    type: Number,
    required: true
  },
  NGO_address: {
    type: String, // Additional field for the NGO's address
    required: true
  },
  members: [
    {
      name: {
        type: String,
        required: true
      },
      aadhaarID: {
        type: String, // Assuming Aadhaar ID is a string
        required: true
      }
    }
  ],
  pets: [
    {
      name: {
        type: String,
        required: true
      },
      animalType: {
        type: String,
        required: true
      },
      petID: {
        type: Number,
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('NGO', ngoSchema);