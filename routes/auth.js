const express = require('express')
const { register, login, getMe, logout, activateAccount, forgotPassword, resetPassword, sortUsers, removeAccount, deleteRandomCode, checkToken} = require('../controllers/auth');
const { where } = require('../models/User');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/signup', register);
router.post('/email-activate',activateAccount)

router.post('/login',login);
//router.get('/getToken', getToken)

router.get('/logout',logout);
router.get('/sort',sortUsers)


router.get('/me', protect,  getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);
router.post('/removeAccount',removeAccount)
router.post('/deleteCode', deleteRandomCode)
module.exports = router; 
