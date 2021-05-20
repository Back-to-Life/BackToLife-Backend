const express = require('express');

const { 
    mostPoint
} = require('../controllers/points')



const router = express.Router();


router.get("/mostPoint", mostPoint)  
     

  
module.exports = router;