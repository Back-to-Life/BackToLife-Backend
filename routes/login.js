const express = require('express');

const { 
    createLogin,
    updateLogin,
    getLogins,
    getLogin,
    deleteLogin,
    increaseCounter
} = require('../controllers/logins')

const router = express.Router({ mergeParams: true });

router.put("/:id/increaseCounter", increaseCounter)
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