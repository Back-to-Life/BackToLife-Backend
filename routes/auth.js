const express = require('express')
const { register, login, getMe, logout } = require('../controllers/auth')
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/signup', register);


router.post('/login', login);
router.get('/logout',logout);



router.get('/me', protect, getMe);


module.exports = router; 
