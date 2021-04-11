const express = require('express')
const { register, login, getMe, logout, activateAccount, forgotPassword, resetPassword } = require('../controllers/auth')
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/signup', register);
router.post('/email-activate',activateAccount)

router.post('/login', login);
router.get('/logout',logout);



router.get('/me', protect, getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);
module.exports = router; 
