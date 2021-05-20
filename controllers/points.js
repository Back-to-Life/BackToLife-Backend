const ErrorResponse = require('../utils/errorResponse');
const LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const Points = require('../models/Points');




exports.updatePoint = async (req, res, next) => {
  pointName = req.body.pointName


  if (pointName == "Glass") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 15

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Glass: 1
        }
      }
    )

  }
  if (pointName == "Plastic") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 13

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Plastic: 1
        }
      }
    )
  }
  if (pointName == "Electronic") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 11

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Electronic: 1
        }
      }
    )
  }
  if (pointName == "Battery") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 9

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Battery: 1
        }
      }
    )
  }
  if (pointName == "Metal") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 7

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Metal: 1
        }
      }
    )
  }
  if (pointName == "Organic") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 5

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Organic: 1
        }
      }
    )
  }
  if (pointName == "Paper") {
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {
        $inc: {
          point: 3

        }
      }


    );
    const point = await Points.findOneAndUpdate(
      user.unicID,
      {
        $inc: {
          Paper: 1
        }
      }
    )
  }





  res.status(200).json({ success: true })

}

exports.mostPoint = async (req, res, next) => {
  

}
