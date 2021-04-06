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


exports.updatePoint = async (req, res, next) => {
  pointName = req.body.pointName
    
    if(pointName == "Glass"){
        const login = await LoginDate.findByIdAndUpdate(
    
             req.params.id,
      {
        $inc: {
           points: 15
         
        }
    }
          
        
        );
    
    }
    if(pointName == "Plastic") {
        const login = await LoginDate.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          points: 13
        
       }
   }
         
       
       );
    }
    if(pointName == "Electronic") {
        const login = await LoginDate.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          points: 11
        
       }
   }
         
       
       );
    }
    if(pointName == "Battery") {
        const login = await LoginDate.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          points: 9
        
       }
   }
         
       
       );
    }
    if(pointName == "Metal") {
        const login = await LoginDate.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          points: 7
        
       }
   }
         
       
       );
    }
    if(pointName == "Organic") {
        const login = await LoginDate.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          points: 5
        
       }
   }
         
       
       );
    }
    if(pointName == "Paper") {
        const login = await LoginDate.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          points: 3
        
       }
   }
         
       
       );
    }
    
    
res.status(200).json({success: true})
    
} 
