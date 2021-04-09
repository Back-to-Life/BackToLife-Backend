const express = require('express')
const { register, login, getMe, logout, activateAccount } = require('../controllers/auth')
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/signup', register);
router.post('/email-activate',activateAccount)

router.post('/login', login);
router.get('/logout',logout);



router.get('/me', protect, getMe);


module.exports = router; 
