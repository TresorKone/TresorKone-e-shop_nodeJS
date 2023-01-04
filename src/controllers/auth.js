const bcrypt = require('bcryptjs');
const flashPackage = require("connect-flash");
const nodemailer = require('nodemailer');
const  sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models').User;

//mailer
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));


exports.getSign = (req, res, next) => {
    res.render('auth/sign', {
        isAuthenticated: false
    })
}

exports.getLogin = (req, res, next) => {
    let flashKey = req.flash('error');
    if (flashKey.error > 0) {
        flashKey = flashKey[0]
    } else {
        flashKey = null;
    }

    res.render('auth/login', {
        isAuthenticated: false,
        errorMessage: flashKey
    })
}

exports.postSign = (req, res, next) => {
    const email = req.body.email;
    User.findOne({where: { email: email } })
        .then(async userCheck => {
            if (userCheck) {
                console.log('user already exist')
                return res.redirect('/login');
            } else {
                try {
                    const {email, password} = req.body;
                    const hash = await bcrypt.hash(password, 10);
                    const user = await new User({
                        email: email,
                        password: hash,
                        cart: { items: [] }
                    });
                    user.save().then(r => {
                        res.status(200).redirect('/')
                        //TODO:to fix later
                        /*
                        return transporter.sendMail({
                            to: email,
                            from: 'blueGiant@store.com',
                            subject: 'welcome in your adventure in the music world',
                            html: '<h1>successfully signed up</h1>'
                        });
                         */
                    }).catch(err => {
                        console.log(err);
                    })
                } catch (e) {
                    console.log(e);
                    res.status(500).send('something my be broke')
                }
            }
        })
};

exports.postLogin = (req, res, next) => {
    try {
        const {email, password} = req.body;
        User.findOne({where: { email: email } })
            .then(user => {
                if (!user) {
                    req.flash('error', 'invalid credentials.')
                    return res.redirect('/login')
                }
                bcrypt
                    .compare(password, user.password)
                    .then(Match => {
                        if (Match) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            return res.redirect('/')
                            //return res.status(200).json('good password')
                        }
                        res.json('wrong password')
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
            console.log(err);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('something my be broke')
    }
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
