const express = require('express');

const {
    updateLogin,
    getLogins,
    increaseCounter,
    showCounter
} = require('../controllers/logins');


const router = express.Router({ mergeParams: true });

router.put("/:id/increaseCounter", increaseCounter)
router.get("/:id/showCounter", showCounter)

router
    .route('/')
    .get(getLogins)
   


    router
      .route('/:id')
      .put(updateLogin);
    


   
module.exports = router;