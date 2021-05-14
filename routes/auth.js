const express = require('express')
const { register, login, getMe, logout, activateAccount, forgotPassword, resetPassword, sortUsers, updateUrl } = require('../controllers/auth')
//const { protect } = require('../middleware/auth');
const User = require ('../models/User')

const router = express.Router();

router.post('/signup', register);
router.post('/email-activate',activateAccount)

router.post('/login', login);
router.get('/logout',logout);
router.get('/sort',sortUsers)


router.get('/me', getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);

//router.put('/:id/updateUrl',updateUrl);
module.exports = router; 
