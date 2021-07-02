const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a fistname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    point: {
        type: Number,
        default: 0,
        unique: false
    },
    randomCode: {
        type: Number,
        unique: false
    },
    login: {
        type: Boolean
    },
    forgotCode: {
        type: Number
    },
    id: {
        type: Number
    },
    imageUrl: {
        type: String,
        default: "http://c12.incisozluk.com.tr/res/incisozluk//11503/6/3445216_o62f6.jpg"
    },
    refreshToken: {
        type: String
    },
    unicID: {
        type: String

    },
    forgotCode: {
        type: Number
    }
})



// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    
    return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

};
UserSchema.methods.deleteForgotToken = function (forgotCode) {
    var user = this;

    user.update({ $unset: { forgotCode} }, function (err, user) {
        if (err) return err;
        else {
            return user
        }
    })
}
UserSchema.methods.getId = function () {
    return this._id
}
UserSchema.methods.createUniqueId = function () {
    this.unicID = this._id
    return this.unicID
}

UserSchema.methods.deleteToken = function (token, cb) {
    var user = this;

    user.update({ $unset: { token: 1 } }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);

    })
}
UserSchema.methods.deleteForgotToken = function (forgotCode) {
    var user = this;

    user.update({ $unset: { forgotCode} }, function (err, user) {
        if (err) return err;
        else {
            return user
        }

    })
}
UserSchema.methods.getUnicId = function () {
    return this.unicID
}

UserSchema.methods.deleteCode = function () {
    var user = this;

    user.update({ $unset: { randomCode: 0 } }, function (err, user) {
        if (err) return cb(err);


    })
}


module.exports = mongoose.model('User', UserSchema);