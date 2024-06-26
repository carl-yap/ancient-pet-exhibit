const mongoose = require('mongoose')

const ProgressSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    dogs: {
        type: [Boolean],
        default: [false, false, false, false, false]
    },
    cats: {
        type: [Boolean],
        default: [false, false, false, false, false]
    },
    birds: {
        type: [Boolean],
        default: [false, false, false, false, false]
    },
    small: {
        type: [Boolean],
        default: [false, false, false, false, false]
    }
})

module.exports = mongoose.model('Progress', ProgressSchema)