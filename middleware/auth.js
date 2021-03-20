const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

// Protect routes
exports.protect = async ( req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Baerer') ){
        token = req.headers.authorization.split(' ')[1];

    }

  else if(req.cookies.token){
        token = req.cookies.token

    }

    // Make sure token exists
    if(!token) {
        return next ( new ErrorResponse('Not authorize to access this route', 401))
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        console.log(decoded)

        req.user = await User.findById(decoded.id)

        next()


        
    } catch (err) {
        return next ( new ErrorResponse('Not authorize to access this route', 401))
       
    }
}