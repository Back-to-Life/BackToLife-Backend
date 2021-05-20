const express = require('express');

const { 
    getPoint, 
    getPoints, 
    createPoint, 
    updatePoint, 
    deletePoint,
    sortPoints

} = require('../controllers/points')



const router = express.Router();


  
     

  
module.exports = router;