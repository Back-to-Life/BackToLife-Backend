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
    user: {
        type: mongoose.Schema.ObjectId,
        red: "User",
        required: true
    }

})



module.exports = mongoose.model('LoginDate', LoginDateSchema);