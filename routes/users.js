const express = require('express');

const { 
    getUser, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser

} = require('../controllers/users')
const {
    updatePoint
} = require('../controllers/points')
const loginRouter = require("./login")
const pointRouter = require("./point")


const router = express.Router();

router.use('/:id/lastLoginUpdate',loginRouter)
router.use('/points', pointRouter)
router.use('/:id/point',updatePoint)
router
      .route('/')
      .get(getUsers)
      .post(createUser);


      router
      .route('/:id')
      .get(getUser)
      .put(updateUser)
      .delete(deleteUser);

  
module.exports = router;