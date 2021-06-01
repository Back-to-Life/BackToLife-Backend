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

    },
    Date: {
        type: Date,
        default: Date.now
    }

})

/*LoginDateSchema.methods.deleteLogins = async function (givenDate) {
    const login = this;

    console.log(givenDate);
    console.log(login.loginDetails.loginDate);

    if(givenDate[4] - this.loginDetails.loginDate[4] == 0) {
        login.delete(this)
    }

   

};*/



module.exports = mongoose.model('LoginDate', LoginDateSchema);