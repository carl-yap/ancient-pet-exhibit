const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
    species: {
        type: String,
        enum: ['doggo', 'hissy', 'borb', 'smol'],
        required: true
    },
    petcode: {
        type: String,
        required: true,
        default: 'null'
    },
    name: {
        type: String,
        required: true,
        default: 'null'
    },
    description: {
        type: String,
        required: true,
        default: null
    },
    in_gallery: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Pet', PetSchema)