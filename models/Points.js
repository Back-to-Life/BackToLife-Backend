const mongoose = require('mongoose')


const PointsSchema = new mongoose.Schema({
    pointName: {
        type: String,
        required: true
    }

})



module.exports = mongoose.model('Points', PointsSchema);