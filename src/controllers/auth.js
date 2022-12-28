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
    User.findOne({where: { email: email } })
        .then(async userCheck => {
            if (userCheck) {
                return console.log('already exist');
            } else {
                try {
                    const {email, password} = req.body;
                    const hash = await bcrypt.hash(password, 10);
                    const user = await new User({
                        email: email,
                        password: hash
                    });
                    user.save().then(
                        res.status(200).json('it\'s work!')
                    )
                } catch (e) {
                    console.log(e);
                    res.status(500).send('something my be broke')
                }
            }
        })


    /*
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

     */
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