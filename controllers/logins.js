const  LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// GET
/*exports.getUsers = async (req, res, next) => {
   try{
       const users = await User.find();
       res.status(200).json({success: true, data: users })

   }catch(err){
       res.status(400).json({success: false})

   }
}
// GET  
exports.getUser = async (req, res, next) => {
   try {
       const user = await User.findById(req.params.id);

       res.status(200).json({success: true, data: user})
   } catch (err) {
    res.status(400).json({success: false});
       
   }
}
*/

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

/*exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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


// DELETE

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        res.status(400).json({ success: false }); 
    }
  
    
   
}*/

