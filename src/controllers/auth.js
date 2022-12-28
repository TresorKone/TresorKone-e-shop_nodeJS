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
    User.findOne({ WHERE: { email: email} })
        .then(userInfo => {
            if (userInfo) {
                return res.redirect('/sign')
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPwd => {
            const user = new User({
                email: email,
                password: hashedPwd,
                cart: { items: [] }
            });
            res.writeHead(200);
            return user.save();
        })
        .then(r => {
            res.redirect('/login');

        })
        .catch(err => {
        console.log(err)
    })
};