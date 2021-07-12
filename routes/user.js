const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require("./../controller/user");

router.post('/register',
    body('email', "Invalid email").isEmail().normalizeEmail(),
    body('username').isString(),
    body('firstName').isString(),
    body('lastName').isString(),
    body('password', "Password should contain at least 8 characters, 1 number and 1 upper case letter ").isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1
    }),
    (req, res, next) => {
        var err = validationResult(req);

        console.log(err.isEmpty())
        console.log("-----------------------");
        if (!err.isEmpty()) {
            res.status(403).send(err.mapped())
                // errors encountered
        } else {
            console.log(req.body)
            next()
        }

    },
    userController.register
)

router.post('/login',
    body('email', "Invalid email").isEmail().normalizeEmail(),
    body('password').isString(),
    body('password', "Invalid password").matches(/.{8}$/, "i"),
    (req, res, next) => {
        var err = validationResult(req);
        console.log(err.isEmpty())
        console.log("-----------------------");
        if (!err.isEmpty()) {
            res.status(403).send(err.mapped())
                // errors encountered
        } else {
            console.log(req.body)
            next()
        }

    }, userController.login)


router.get("/getAll",
    userController.getUsers);

module.exports = router;