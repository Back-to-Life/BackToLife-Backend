const express = require('express')
const { register, login, getMe, logout, activateAccount, forgotPassword, resetPassword, sortUsers, updateUrl,removeAccount, deleteRandomCode } = require('../controllers/auth')
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
router.post('/removeAccount',removeAccount)
router.post('/deleteCode', deleteRandomCode)

module.exports = router; 
