const express = require('express');

const { 
    getUser, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    usingApplication

} = require('../controllers/users')

const loginRouter = require("./login")


const router = express.Router();

router.use('/:id/lastLoginUpdate',loginRouter)

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