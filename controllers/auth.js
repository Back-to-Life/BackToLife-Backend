const User = require('../models/User')
const Points = require('../models/Points')
const LoginDate = require('../models/LoginDate')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
const nodemailer = require("nodemailer");




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

  let refreshToken;

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
            id: count,
            refreshToken
          });
          const rtoken = user.getSignedJwtToken();
          const unicID = user.createUniqueId();
          user.refreshToken = rtoken;
          user.unicID = unicID;
          user.save()


          const point = await Points.create({
            userName: name,
            unicID: unicID
          })
          const loginDate = await LoginDate.create({
            unicID: unicID,
            loginDetails: {}
          })
          return res.json({
            message: "Email Gönderildi",
            register: true,
            unicID,
            rtoken
          });
        }
      });
    }
  }
  catch (e) {
    return res.status(400).json({
      success: false
    })

  }

}

exports.activateAccount = async (req, res, next) => {
  const { email, randomCodeReq, } = req.body;
  const userEmailSearch = await User.find({ email: email });
  console.log(randomCodeReq);
  console.log(userEmailSearch);
  console.log(userEmailSearch[0].login);
  console.log(userEmailSearch[0].randomCode);

  if (randomCodeReq == userEmailSearch[0].randomCode && userEmailSearch[0].login == false) {
    try {
      // const count = await User.find().count();
      const user = await User.findOne({ email: email })
      user.randomCode = 0;
      user.save();

      const id = user.unicID;
      const refreshToken = user.refreshToken;

      res.status(200).json({
        success: true,
        id,
        refreshToken
      });

    } catch (error) {
      return res.status(500).json('00051', req, error.message);
    }
  }
}
exports.deleteRandomCode = async (req, res, next) => {

  const user = await User.findOne({ randomCode: 0 });
  user.deleteCode();
  user.save()
  res.status(200).json({
    success: true
  })
}


exports.removeAccount = async (req, res, next) => {
  const { email } = req.body;


  const user = await User.findOne({ email: email })
  if (user.randomCode && user.login == false) {
    user.remove()
    res.status(200).json({
      success: true
    })
  } else {
    res.status(400).json({
      success: false
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

  } else {
    user.login = true;



    const id = user.getId();
    const unicID = user.getUnicId()
    const count = await User.find().count();
    let token = user.getSignedJwtToken();
    console.log(token)
    user.refreshToken = token;

    user.save()

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 1 * 1 * 1 * 1

      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }


    let counter = 1;
    const sortingUser = await User.find().sort({ point: -1 });

    for (var i = 0; i < count; i++) {

      if (sortingUser[i].name != user.name) {
        counter++;
      } else {
        break;
      }



    }
    res.status(200).cookie('token', token, options).json({
      success: true,
      token,
      id,
      counter,
      unicID
    });

  }

}




exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    httpOnly: true,
  });

  user = await User.findOne({ login: true });
  user.login = false;
  user.refreshToken = ""
  user.save()
  token1 = user.refreshToken


  res.status(200).json({
    success: true,
    data: {}
  });

};



exports.getMe = async (req, res, next) => {

  const user = await User.findOne({ login: true })

  res.status(200).json({
    success: true,
    data: user,
  });

};

exports.checkToken = async (req, res, next) => {

  const { myRefreshToken } = req.body
  const user = await User.findOne({ refreshToken: req.body.myRefreshToken })
  try {
    // Verify token

    const decoded = jwt.verify(myRefreshToken, process.env.JWT_SECRET);
    console.log("verify sonuc:", decoded)


    req.user = await User.findById(decoded.id);
    res.json({
      success: true,
      decoded
    })


    next();
  } catch (err) {
    return next(new ErrorResponse(err));
  }



}


// Forgot password
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  let forgotToken = Math.floor(Math.random() * 999999);

  const user = await User.findOne({email:email})

  user.forgotCode = forgotToken;
  user.save();

  const data = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Back To Life Forgot Password',
    html: `
    <h2>Hello ! Please copy token that sent.</h2>
    <p>${forgotToken}</p>
    `
  };
  const mailSucces = transporter.sendMail(data, async function (error, info) {
    if (error) {
      return res.json({
        message: "Mail is not goin server broken ",
        errorMessage: error
      })
    } else {
      return res.json({
        message: "Email Gönderildi",

      }
      );
    }
  });

};


// Reset password
exports.resetPassword = async (req, res, next) => {
  const { forgotCode, email, password } = req.body;

  const user = await User.findOne({email:email})

  if (forgotCode) {
    if (forgotCode == user.forgotCode) {
      const user = await User.findOne({ email: email })
      user.password = password;
      user.deleteForgotToken(forgotCode);
      user.save();
      res.status(200).json({
        success: true
      })


    } else {
      res.status(400).json({
        success: false,
        message: "Wrong code!"

      })
    }

  }
}

exports.accountSettings = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.params.id)
  const isMatch = await user.matchPassword(password);

  if (isMatch) {


    if (email && name) {
      user.email = email;
      user.name = name;
      user.save()
      res.status(200).json({
        success: true
      })


    }
    if (email && !name) {
      user.email = email;
      user.save();
      res.status(200).json({
        success: true
      })
    }
    if (!email && name) {
      user.name = name;
      user.save()
      res.status(200).json({
        success: true
      })
    }


  } else {
    res.status(400).json({
      success: false,
      message: "Please check your password!"
    })
  }


}
exports.sortUsers = async (req, res, next) => {

  const count = await User.find().count();

  let users = []


  for (let i = 0; i < count; i++) {
    users[i] = await User.findOne({ id: i })
  }
  let temp;
  let k, l;

  for (k = 0; k < count - 1; k++) {
    for (l = 0; l < count - k - 1; l++) {
      if (users[l].point < users[l + 1].point) {
        temp = users[l]
        users[l] = users[l + 1];
        users[l + 1] = temp

      }
    }
  }

  let names = []
  let points = []
  let ids = []
  let imageUrls = []
  for (let i = 0; i < count; i++) {

    names[i] = users[i].name
    points[i] = users[i].point
    ids[i] = users[i]._id
    imageUrls[i] = users[i].imageUrl
  }
  return res.json({
    data: {
      ids,
      names,
      points,
      imageUrls

    }
  })

}
