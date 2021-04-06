const mongoose = require('mongoose')


const LoginDateSchema = new mongoose.Schema({
    loginDate: {
        type: String,
        required: true
    },
    loginCounter: {
        type: Number,
        required: true
    },
    points : {
        type: Number,
        required: true
    },
    pointName : {
        type: String
    }
})

LoginDateSchema.methods.getId = function() {
    return this._id
}

LoginDateSchema.methods.getpointName = function() {
    return this.pointName
}
module.exports = mongoose.model('LoginDate', LoginDateSchema);