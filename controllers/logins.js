const LoginDate = require('../models/LoginDate')
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');






// GET
exports.getLogins = async (req, res, next) => {


    const logins = await LoginDate.find();

    res.status(200).json({
        success: true,
        data: logins
    })
}




// POST

/*exports.createLogin = async (req, res, next) => {
    req.body.user = req.params.id;
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(
                `No user with the id of ${req.params.id}`,
                404
            )
        )
    }
    const login = await LoginDate.create(req.body);

    res.status(201).json({
        success: true,
        data: login
    })







}*/


// PUT

exports.updateLogin = async (req, res, next) => {


    try {
        const login = await LoginDate.findOneAndUpdate(req.params.unicID, req.body, {
            new: true,
            runValidators: true
        })
        if (!login) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: login })
    } catch (err) {
        res.status(400).json({ success: false });
    }



}

// DELETE

/*exports.deleteLogin = async (req, res, next) => {
    try {
        const login = await LoginDate.findByIdAndDelete(req.params.id)
        if (!login) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} })

       





    } catch (err) {
        res.status(400).json({ success: false });
    }



}*/
exports.increaseCounter = async (req, res, next) => {

    try {



        const login = await LoginDate.findOneAndUpdate({ $and: [{ unicID: req.params.id }, { "loginDetails.loginDate": req.body.loginDate }] }, {
            $inc: {
                "loginDetails.$[].loginCounter": 1
            }
        })
        if (!login) {
            const logins = await LoginDate.create({
                unicID: req.params.id,
                loginDetails: {
                    loginDate: req.body.loginDate
                }
            })
            return res.status(200).json({
                success: true,
                data: logins
            })

        }





        return res.status(200).json({
            success: true,
            data: login
        })


    } catch (error) {

        return res.json({
            success: false
        })

    }

}
exports.showCounter = async (req, res, next) => {
    const login = await LoginDate.find({ unicID: req.params.id })
    return res.json({
        success: true,
        data: login
    })
}


