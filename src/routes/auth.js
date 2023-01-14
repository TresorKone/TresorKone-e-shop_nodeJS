const path = require('path');

const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models').User

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/sign', authController.getSign);

router.post('/sign',
    [
        check('email')
            .isEmail()
            //.normalizeEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({where: { email: value } })
                    .then(mailCheck => {
                        if (mailCheck) {
                            return Promise.reject(
                              'E-mail already exists'
                            );
                        }
                    });
            })
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only number and text and at least 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ]
    ,authController.postSign);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

module.exports = router;