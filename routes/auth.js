const express = require('express')
const {
    register,
    login,
    getMe,
    logout,
    activateAccount,
    forgotPassword,
    resetPassword,
    sortUsers,
    removeAccount,
    deleteRandomCode,
    accountSettings
} = require('../controllers/auth');




const router = express.Router();

router.post('/signup', register);
router.post('/email-activate', activateAccount)

router.post('/login', login);

router.get('/:id/logout', logout);
router.get('/sort', sortUsers)


router.get('/me', getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword', resetPassword);
router.put('/:id/accountSettings', accountSettings);
router.post('/removeAccount', removeAccount)
router.post('/deleteCode', deleteRandomCode)
module.exports = router;
