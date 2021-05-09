const Point = require('../models/Points')
const ErrorResponse = require('../utils/errorResponse');
const LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const Points = require('../models/Points');


exports.getPoints = async (req, res, next) => {


  const points=await Point.find();
  
  res.status(200).json({
      success: true,
      count: points.length,
      data: points
})
}

exports.sortPoints = async (req, res, next) => {
  /*const points = [];
  for(i=0;i<10;i++){
    points[i] = Point.find(req.params.point);
  }
  console.log(points)*/
  
}


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
        const user = await User.findByIdAndUpdate(
    
             req.params.id,
      {
        $inc: {
           point: 15
         
        }
    }
          
        
        );
    
    }
    if(pointName == "Plastic") {
        const user = await User.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          point: 13
        
       }
   }
         
       
       );
    }
    if(pointName == "Electronic") {
        const user = await User.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          point: 11
        
       }
   }
         
       
       );
    }
    if(pointName == "Battery") {
        const user = await User.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          point: 9
        
       }
   }
         
       
       );
    }
    if(pointName == "Metal") {
        const user = await User.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          point: 7
        
       }
   }
         
       
       );
    }
    if(pointName == "Organic") {
        const user = await User.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          point: 5
        
       }
   }
         
       
       );
    }
    if(pointName == "Paper") {
        const user = await User.findByIdAndUpdate(
    
            req.params.id,
     {
       $inc: {
          point: 3
        
       }
   }
         
       
       );
    }
    
    
res.status(200).json({success: true})
    
} 
