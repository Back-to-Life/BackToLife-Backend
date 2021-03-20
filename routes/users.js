const express = require('express');

const { 
    getUser, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/users')

const router = express.Router();

//const { protect } = require('../middleware/auth')

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