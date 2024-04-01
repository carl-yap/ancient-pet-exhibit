const mongoose = require('mongoose')

const ProgressSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    doggo: {
        type: [Boolean],
        default: [false, false, false, false, false]
    },
    hissy: {
        type: [Boolean],
        default: [false, false, false, false, false]
    },
    borb: {
        type: [Boolean],
        default: [false, false, false, false, false]
    },
    smol: {
        type: [Boolean],
        default: [false, false, false, false, false]
    }
})

module.exports = mongoose.model('Progress', ProgressSchema)