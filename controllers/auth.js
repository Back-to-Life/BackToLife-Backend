const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
const mailgun = require('mailgun-js')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const nodemailer = require("nodemailer");
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');

let token = Math.floor(Math.random()*999999);
let forgotToken = Math.floor(Math.random()*999999);

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

// Create User
// POST
exports.register = async (req, res, next) => {
  let token = Math.floor(Math.random() * 999999);
  const { name, email, password } = req.body;
  // req.randomCode = token;

  console.log(token);

  var data = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Back To Life',
    html: `
    <h1>Hello ${name} ! Please copy token that sent.</h1>
    <h1>${token}</h1>
    `
  };


  try {
    const userExist = await User.exists({ email })
    console.log(userExist);
    if (userExist) {
      res.status(401).json({
        success: "false",
        because: "this is email is using bro"
      });
    } else {

      const mailSucces = transporter.sendMail(data, async function (error, info) {
        if (error) {
          return res.json({
            message: "Mail is not goin server broken ",
            errorMessage: error
          })
        } else {
          const count = await User.find().count();
          const user = await User.create({
            name,
            email,
            password,
            login: false,
            point: 0,
            randomCode: token,
            id: count
          });
          return res.json({
            message: "Email Gönderildi",
            register: true
          });
        }
      });
    }
  } catch (e) {
    return res.status(500).json(errorHelper('00051', req, err.message));
  }
}

exports.activateAccount = async (req, res, next) => {
  const {email, randomCodeReq, } = req.body;
  const userEmailSearch = await User.find({ email: email });
     console.log(randomCodeReq);
    console.log(userEmailSearch);
    console.log(userEmailSearch[0].login);
    console.log(userEmailSearch[0].randomCode); 

  if (randomCodeReq == userEmailSearch[0].randomCode && userEmailSearch[0].login == false) {
    console.log('burdayım lo');
    try {
     // const count = await User.find().count();
      const user = await User.findOne({email:email})
      user.randomCode = 0;
      user.save();
   
     res.status(200).json({
        success: true
      });
      
    } catch (error) {
      return res.status(500).json('00051', req, error.message);
    }
  }
}
exports.deleteRandomCode = async(req, res, next) => {

  const user = await User.findOne({randomCode:0});
  user.deleteCode();
  user.save() 
  res.status(200).json({
    success: true
  })
}


exports.removeAccount = async (req, res, next) => {
  const {email } = req.body;


  const user = await User.findOne({email:email})
  if(user.randomCode && user.login == false) {
    user.remove()
    res.status(200).json({
      success: true
    })
  }else {
    res.status(400).json({
      success:false
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
  //const user = await User.findOne({email:email})
  user.refreshToken = token;
  user.save()
  console.log(user.refreshToken);
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
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Back To Life Forgot Password',
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
}

exports.updateUrl = async (req, res, next) => {
  const url = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, url, {
        new: true,
        runValidators: true
    })
    if(!user) {
        return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: user })
} catch (err) {
    res.status(400).json({ success: false }); 
}


}


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

  let names = new Array();
  let points = new Array();
  let ids = new Array();

  for(let a = 0; a < count; a++) {
    names[a] = users[a].name
    points[a] = users[a].point
    ids[a] = users[a]._id
  }

  return res.json({
    data:users
  }) 
}



async function sort(users, count)
{
  
  if (count == 1){
    return;
  }
  for(var i = 0; i < count; i++) {
    if(users[i] > users[i+1]){
      temp = users[i]
      users[i] = users[i+1];
      users[i+1] = temp
    }

  }
  
  sort(users, count-1)
    
}