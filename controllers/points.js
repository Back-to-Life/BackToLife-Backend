const Point = require('../models/Points')



// GET
exports.getPoints = async (req, res, next) => {
   try{
       const points = await Point.find();
       res.status(200).json({success: true, data: points })

   }catch(err){
       res.status(400).json({success: false})

   }
}
// GET  
exports.getPoint = async (req, res, next) => {
   try {
       const point = await Point.findById(req.params.id);

       res.status(200).json({success: true, data: point})
   } catch (err) {
    res.status(400).json({success: false});
       
   }
}


// POST

exports.createPoint = async (req, res, next) => {
  try{
      const point = await Point.create(req.body)

  res.status(201).json({
      success: true,
      data: point
  })
}catch(err) {
    res.status(400).json({success: false});
}
}


// PUT

exports.updatePoint = async (req, res, next) => {
    try {
        const point = await Point.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!point) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: point })
    } catch (err) {
        res.status(400).json({ success: false }); 
    }
  
    
   
}


// DELETE

exports.deletePoint = async (req, res, next) => {
    try {
        const point = await Point.findByIdAndDelete(req.params.id)
        if(!point) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        res.status(400).json({ success: false }); 
    }
  
    
   
}

