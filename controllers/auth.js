const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
const LoginDate = require('../models/LoginDate')


// Create User
// POST
  
exports.register = async (req, res, next) => {
   const { name, email, password } = req.body;
   
   // Create User
   const user = await User.create({
       name,
       email,
       password
   })
 
  

   /*const token = user.getSignedJwtToken();

   const id = user.getId();

   res.status(200).json({success: true, token, id})*/
   sendTokenResponse(user, 200, res);
   

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


  /*const token = user.getSignedJwtToken();

  const id = user.getId();

 

 

  res.status(200).json({success: true, token, id})
   */
  const id = user.getId();
  sendTokenResponse(user, 200, res, id);
  
  
 }

 exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};



exports.getMe = async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
};


const sendTokenResponse = (user, statusCode, res, id) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    id
  });
};