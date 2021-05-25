const express = require('express');

const { 
    mostPoint, getPoint
} = require('../controllers/points')



const router = express.Router();


 
router.get("/:id/Points", getPoint)
     

  
module.exports = router;