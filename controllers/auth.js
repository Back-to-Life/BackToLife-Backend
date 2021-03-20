const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');

// Sign JWT and return
/*const getSignedJwtToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}*/


// Create User
// POST
  
exports.register = async (req, res, next) => {
   const { firstName, lastName, email, password } = req.body;
   
   // Create User
   const user = await User.create({
       firstName,
       lastName,
       email,
       password
   })
 
   sendTokenResponse(user, 200, res)
}

// Login User
// POST
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

   sendTokenResponse(user, 200, res)
   
  
  
 }

 // Get token from model, create cookie and send response
 const sendTokenResponse = (user,statusCode, res) => {

  // Create token
  const token = user.getSignedJwtToken()
  
  const options = {
      httpOnly: true

  }
  if(process.env.NODE_ENV === 'production'){
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    })

 }