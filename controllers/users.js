const  User = require('../models/User')



// GET
exports.getUsers = async (req, res, next) => {


    const users = await User.find()
    
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
})
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


// POST

exports.createUser = async (req, res, next) => {
  try{
      const user = await User.create(req.body)

  res.status(201).json({
      success: true,
      data: user
  })
}catch(err) {
    res.status(400).json({success: false});
}
}


// PUT

exports.updateUser = async (req, res, next) => {
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
  
    
   
}

