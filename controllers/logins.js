const { query } = require('express');
const  LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

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



       const login = await LoginDate.findById(req.params.id);

       
    const result = await LoginDate.findOneAndUpdate(
       {
           $inc: {
               loginCounter: 1
           }
       }
    )

       
       res.status(200).json({success: true })
   } catch (err) {
    res.status(400).json({success: false});
       
   }
}


// POST

exports.createLogin = async (req, res, next) => {
    req.body.user = req.params.id;
    const user = await User.findById(req.params.id);
    const result = await LoginDate.findOneAndUpdate(
        {
            $inc: {
                loginCounter: 1
            }
        }
        )

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
   let login = await LoginDate.findById(req.params.id)
   const result = await LoginDate.findOneAndUpdate(
    {
        $inc: {
            loginCounter: 1
        }
    }
    )



   if(!login) {
       return next(new ErrorResponse(`No user login with the id of ${req.params.id}`),
       404
       )
   }

  login = await LoginDate.findByIdAndUpdate(req.params.id, req.body , {
      new:true,
      runValidators: true
  } )
    res.status(200).json({
        succes: true,
        data: login
    })
   
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

