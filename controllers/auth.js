const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
const LoginDate = require('../models/LoginDate');
const mailgun = require('mailgun-js')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')



const DOMAIN = 'sandboxe2c61ef61a034fd4b171bd2292658dbf.mailgun.org'
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

// Create User
// POST
exports.register = async (req, res, next) => {
  const { name, email, password, point } = req.body;

  const activate_token = jwt.sign({name,email,password,point},process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});

  const data = {
    from: 'noreply@backtolife.com',
    to: email,
    subject: 'BackToLife',
    html:`
    <h2>Please click on given link to activate your account</h2>
    <p>${process.env.CLIENT_URL}/authentication/activate/${activate_token}</p>
    `
  };
  mg.messages().send(data, function (error, body) {
    if(error){
      return res.json({
        message: error.message
      })

      
    }
    return res.json({message:'Email has been sent'})
  
  });
  


}


exports.activateAccount = async (req, res, next) => {
  
  const {token} = req.body;
  if(token) {
    jwt.verify(token, process.env.JWT_ACC_ACTIVATE, exports.function = async (err, decodedtoken) =>{
      if(err) {
        return res.status(400).json({error:"Incorrect link"})
      }
      const { name, email, password, point} = decodedtoken;
      const user = await User.create({
        name,
        email,
        password,
        point
    })
    const id = user.getId();

   sendTokenResponse(user, 200, res, id);
  
   
 
 
    
    })
  }
  
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


// Forgot password
exports.forgotPassword = async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = await User.findOne({ email: req.body.email });


  if(!user) {
    return next(new ErrorResponse('There is no user with that email', 404))
  }


  const resetToken = user.getResetPasswordToken();


  await user.save({ validateBeforeSave: false })


  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message

    })
    res.status(200).json({ success: true, data:'Email sent' });
  } catch (error) {
    console.log(err);
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false })

    return next(new ErrorResponse('Email could not be sent', 500))
  }
  
};


// Reset password
exports.resetPassword = async (req, res, next) => {
 
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  if(!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const id = user.getId();
  sendTokenResponse(user, 200, res, id);
};