const express = require('express');

const { 
    createLogin,
    updateLogin,
    getLogins,
    getLogin,
    deleteLogin,
    increaseCounter,
    showCounter,
    updateDate
} = require('../controllers/logins');
const { update } = require('../models/User');

const router = express.Router({ mergeParams: true });

router.put("/:id/increaseCounter", increaseCounter)
router.get("/:id/showCounter", showCounter)

router
    .route('/')
    .get(getLogins)
    //.post(createLogin);


    router
      .route('/:id')
      //.delete(deleteLogin)
      .put(updateLogin);
    


   
module.exports = router;