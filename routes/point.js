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




router
      .route('/')
      .get(getPoints)
      
      


      router
      .route('/:id')
      .get(getPoint);

      
     

  
module.exports = router;