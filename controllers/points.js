const Point = require('../models/Points')
const ErrorResponse = require('../utils/errorResponse');
const LoginDate = require('../models/LoginDate')


// GET  
exports.getPoint = async (req, res, next) => {
    const point = await Point.findById(req.params.id).populate({
        path: 'logindates',
        select: 'points'
      });
    
      if (!point) {
        return next(
          new ErrorResponse(`No Point with the id of ${req.params.id}`, 404)
        );
      }
    
      res.status(200).json({
        success: true,
        data: point
      });
}


/*exports.updatePoint = async(req,res,next) => {


    const login = await LoginDate.findByIdAndUpdate(
        req.params.id,
      {
        $inc: {
           points: 15
         
        }
    }
          
        );
    
    
res.status(200).json({success: true})
}*/

    
