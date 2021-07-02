const express = require('express');

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    sortUsers,
    updateUrl

} = require('../controllers/users')
const {
    updatePoint
} = require('../controllers/points')
const { checkToken } = require("../controllers/auth")
const loginRouter = require("./login")
const pointRouter = require("./point")


const router = express.Router();

router.use('/:id/lastLoginUpdate', loginRouter)
router.use('/:id/point', updatePoint);
router.put('/:id/updateUrl', updateUrl)
router.put('/:id/checkToken', checkToken)
router
    .route('/')
    .get(getUsers)



router
    .route('/:id')
    .get(getUser)





module.exports = router;