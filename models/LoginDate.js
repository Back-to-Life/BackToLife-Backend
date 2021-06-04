const mongoose = require('mongoose')


const LoginDateSchema = new mongoose.Schema({
    loginDetails: [
        {
            loginDate: {
                type: String,
                default: "21.05.2021"
            },
            loginCounter: {
                type: Number,
                default: 0

            }
        }
    ],
    unicID: {
        type: String,
        ref: "Users",
        required: true

    }
})



module.exports = mongoose.model('LoginDate', LoginDateSchema);