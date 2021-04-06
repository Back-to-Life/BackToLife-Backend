const express = require('express');

const { 
    createLogin,
    updateLogin,
    getLogins,
    getLogin,
    deleteLogin
} = require('../controllers/logins')

const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(getLogins)
    .post(createLogin);


    router
      .route('/:id')
      .get(getLogin)
      .delete(deleteLogin)
      .put(updateLogin);


   
module.exports = router;