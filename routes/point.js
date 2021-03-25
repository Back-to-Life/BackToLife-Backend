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
      .route('/')
      .get(getPoints)
      .post(createPoint);


      router
      .route('/:id')
      .get(getPoint)
      .put(updatePoint)
      .delete(deletePoint);

  
module.exports = router;