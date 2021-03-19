const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');

// Sign JWT and return
const getSignedJwtToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}



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
   // Create token
   const token = getSignedJwtToken(user._id);
   res.status(200).json({ success: true, token})
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

    res.status(200).json({ success: true})
  
  
 }