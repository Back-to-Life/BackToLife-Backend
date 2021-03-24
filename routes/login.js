const express = require('express');

const { 
    createLogin
} = require('../controllers/logins')

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .post(createLogin);



   
module.exports = router;