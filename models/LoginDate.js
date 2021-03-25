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

LoginDateSchema.methods.getCounter = async function() {
    
    return this.loginCounter+1
}


module.exports = mongoose.model('LoginDate', LoginDateSchema);