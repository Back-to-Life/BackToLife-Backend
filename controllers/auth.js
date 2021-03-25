const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
const LoginDate = require('../models/LoginDate')


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
 
  

   const token = user.getSignedJwtToken();

   const id = user.getId();

   res.status(200).json({success: true, token, id})
   

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


  const token = user.getSignedJwtToken();

  const id = user.getId();

  let date = user.getDate()


 

  res.status(200).json({success: true, token, id, date})
   
  
  
 }

