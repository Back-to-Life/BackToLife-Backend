const User = require('../models/User');
const Points = require('../models/Points');


// GET
exports.getPoint = async (req, res, next) => {
  const points = await Points.findOne({ unicID: req.params.id })
  return res.json({
    success: true,
    data: points

  })
}


exports.updatePoint = async (req, res, next) => {
  pointName = req.body.pointName


  if (pointName == "glass" || pointName == "plastic" || pointName == "electronic" || pointName == "battery" || pointName == "metal" || pointName == "organic" || pointName == "paper") {

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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Glass: 1
          }
        }
      ).then(res.status(200).json({ success: true }))


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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Plastic: 1
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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Electronic: 1
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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Battery: 1
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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Metal: 1
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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Organic: 1
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
        {
          unicID: user.unicID
        },
        {
          $inc: {
            Paper: 1
          }
        }
      )
      res.status(200).json({ success: true })
    }




  }
  else {
    res.status(400).json({ success: false })
  }





}

