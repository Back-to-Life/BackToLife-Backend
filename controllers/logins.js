const { query } = require('express');
const { findOneAndUpdate, findById } = require('../models/LoginDate');
const  LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const Points = require('../models/Points')





// GET
exports.getLogins = async (req, res, next) => {


    const logins=await LoginDate.find();
    
    res.status(200).json({
        success: true,
        count: logins.length,
        data: logins
})
}


// GET  
exports.getLogin = async (req, res, next) => {
   try{



       const login = await LoginDate.findByIdAndUpdate(
           req.params.id,
           {
            $inc: {
                loginCounter: 1
            }
        }
           );

    
       
    
       

       
       res.status(200).json({success: true })
   } catch (err) {
    res.status(400).json({success: false});
       
   }
}


// POST

exports.createLogin = async (req, res, next) => {
    req.body.user = req.params.id;
    const user = await User.findById(req.params.id);
   
    if(!user){
        return next(
            new ErrorResponse(
                `No user with the id of ${req.params.id}`,
                404
            )
        )
    }
        const login = await LoginDate.create(req.body);
        
        res.status(201).json({
        success: true,
        data: login
    })
    

    




}


// PUT
 
exports.updateLogin = async (req, res, next) => {
  

    const deneme = await LoginDate.findById(req.params.id)
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

// DELETE

exports.deleteLogin = async (req, res, next) => {
    try {
        const login = await LoginDate.findByIdAndDelete(req.params.id)
        if(!login) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        res.status(400).json({ success: false }); 
    }
  
    
   
}


 