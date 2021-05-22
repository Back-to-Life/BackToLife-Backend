const express = require('express')
const { register, login, getMe, logout, activateAccount, forgotPassword, resetPassword, sortUsers, updateUrl,removeAccount, deleteRandomCode, whereAmI } = require('../controllers/auth');
const { where } = require('../models/User');
//const { protect } = require('../middleware/auth');
const User = require ('../models/User')
const {increaseCounter} = require('../controllers/logins')

const router = express.Router();

router.post('/signup', register);
router.post('/email-activate',activateAccount)

router.post('/login', login, increaseCounter);
router.get('/logout',logout);
router.get('/sort',sortUsers)


router.get('/me', getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);
router.post('/removeAccount',removeAccount)
router.post('/deleteCode', deleteRandomCode)
module.exports = router; 
