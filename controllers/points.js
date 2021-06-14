const ErrorResponse = require('../utils/ErrorResponse');
const LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const Points = require('../models/Points');


// GET
exports.getPoint = async(req, res, next) => {
  const points = await Points.findOne({unicID:req.params.id})
  return res.json({
    success: true,
    data: points

  })
}


exports.updatePoint = async (req, res, next) => {
  pointName = req.body.pointName

  if (pointName == "glass") {
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
          glass: 1
        }
      }
    )

    res.status(200).json({ success: true })
  }
  if (pointName == "plastic") {
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
          plastic: 1
        }
      }
    )
    res.status(200).json({ success: true })
  }
  if (pointName == "electronic") {
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
          electronic: 1
        }
      }
    )
    res.status(200).json({ success: true })
  }
  if (pointName == "battery") {
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
          battery: 1
        }
      }
    )
    res.status(200).json({ success: true })
  }
  if (pointName == "metal") {
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
          metal: 1
        }
      }
    )
    res.status(200).json({ success: true })
  }
  if (pointName == "organic") {
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
          organic: 1
        }
      }
    )
    res.status(200).json({ success: true })
  }
  if (pointName == "paper") {
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
          paper: 1
        }
      }
    )
    res.status(200).json({ success: true })
  }else {
    res.status(400).json({ success: false })
  }





  

}

