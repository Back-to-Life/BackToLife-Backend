const mongoose = require('mongoose')


const PointsSchema = new mongoose.Schema({
    userName : {
        type: String,
        ref: "Users",
        required: true
    },
    unicID: {
        type: String, 
        ref: "Users",
        required: true
    },
    pointName: {
        type: String
    },
    Glass : {
        type: Number,
        default: 0
    },
    Plastic: {
        type: Number,
        default: 0
    },
    Electronic: {
        type: Number,
        default: 0
    },
    Battery: {
        type: Number,
        default: 0
    },
    Metal: {
        type: Number,
        default: 0
    },
    Organic: {
        type: Number,
        default: 0
    },
    Paper: {
        type: Number,
        default: 0
    }

})


module.exports = mongoose.model('Points', PointsSchema);