const bcrypt = require('bcryptjs');

const User = require('../models').User;

exports.getSign = (req, res, next) => {
    res.render('auth/sign', {

    })
}

exports.getLogin = (req, res, next) => {
    res.render('auth/login')
}

exports.postSign = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: { email: email } })
        .then(userCheck => {
        if (userCheck) {
            return console.log('already exist');
        }else {
            const user = new User({
                email: email,
                password: password
            });
            return user.save()
                .then(r => {
                    console.log('user created');
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
    /*
    const user = new User({
        email: email,
        password: password
    });
    user.save()
        .then(r => {
            console.log('user created');
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
        })

     */
};