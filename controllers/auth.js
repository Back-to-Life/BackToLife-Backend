const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
const mailgun = require('mailgun-js')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
let token = Math.floor(Math.random()*999999);
let forgotToken = Math.floor(Math.random()*999999);



const DOMAIN = 'sandboxe2c61ef61a034fd4b171bd2292658dbf.mailgun.org'
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

// Create User
// POST
exports.register = async (req, res, next) => {
  const { name, email, password, point, randomCode } = req.body;
  req.randomCode = token;
 

 
  const data = {
    from: 'noreply@backtolife.com',
    to: email,
    subject: 'BackToLife',
    html:`
    <h2>Hello ${name}!Please copy token that sent.</h2>
    <p>${token}</p>
    `
  };
  mg.messages().send(data, function (error, body) {
    if(error){
      return res.json({
        message: error.message
      })

      
    }
  
    return res.json({
      message : "email has been send"
    })
  
  
  });

 
  
}

exports.activateAccount = async (req, res, next) => {
  const {name, email, password, randomCode } = req.body;
  
  if(randomCode) {
    if(randomCode == token){
      const user = await User.create({
        name,
        email,
        password,
        login: true

    })
    const id = user.getId();

   sendTokenResponse(user, 200, res, id);
    }
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

    user.login = false;
    user.save();
    return next(new ErrorResponse('Invalid credentials', 401));
    
  }
  
  
  user.login = true;
  user.save();
  const id = user.getId();
  sendTokenResponse(user, 200, res, id);


  
  
 }

 exports.logout = async (req, res, next) => {
 res.cookie('token', 'none', {
    httpOnly: true,
  });

  user = await User.findOne({login: true});
  user.login = false;
  user.save()

  res.status(200).json({
    success: true,
    data: {},
  });
};



exports.getMe = async (req, res, next) => {
  
  const user = await User.findOne({login:true})
  
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
  const {email} = req.body;
  req.forgotCode = forgotToken;


 
  const data = {
    from: 'noreply@backtolife.com',
    to: email,
    subject: 'BackToLife Forgot Password',
    html:`
    <h2>Hello ! Please copy token that sent.</h2>
    <p>${forgotToken}</p>
    `
  };
  mg.messages().send(data, function (error, body) {
    if(error){
      return res.json({
        message: error.message
      })

      
    }
  
    return res.json({
      message : "email has been send"
    })
  
  
  });

 
};


// Reset password
exports.resetPassword = async (req, res, next) => {
  const {forgotCode, email, password } = req.body;
  
  if(forgotCode){
   if(forgotCode == forgotToken){
     const user = await User.findOne({email: email})
      user.password = password;
      user.save();
      res.status(200).json({
        success: true
      })

    
   }else{
     res.status(400).json({
       success: false,
       message: "Wrong code!"
       
     })
   }
  
  }
  


};

exports.sortUsers = async (req, res, next) => {

  let users = new Array();

  const count = await User.find().count();
  console.log(count)



  let i = 0;
  for(i = 0; i < count; i++) {
    users[i] = await User.findOne({id: i});

  }

  let temp;
  temp = await User.findOne({id: 1});
  temp = {}


 
 sort(users, count)
  res.status(200).json({
    success: true,
    data: users
  })

}
async function sort(users, count)
{
  
  if (count == 1){
    return;
  }
  for(var i = 0; i< count; i++) {
    if(users[i] > users[i+1]){
      temp = users[i]
      users[i] = users[i+1];
      users[i+1] = temp
    }

  }
  
  sort(users, count-1)
    
}