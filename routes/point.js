const express = require('express');

const { 
    getPoint, 
    getPoints, 
    createPoint, 
    updatePoint, 
    deletePoint

} = require('../controllers/points')



const router = express.Router();



router
      


      router
      .route('/:id')
      .get(getPoint);

      
     

  
module.exports = router;