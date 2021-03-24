const mongoose = require('mongoose')


const LoginDateSchema = new mongoose.Schema({
    loginDate: {
        type: String,
        required: true
    },
    loginCounter: {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model('LoginDate', LoginDateSchema);