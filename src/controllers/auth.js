const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { flash } = require('express-flash-message');
const  sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

const User = require('../models').User;

//mailer
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));


exports.getLogin = async (req, res, next) => {
    const authError = await req.consumeFlash('authError')
    res.render('auth/login', {
        isAuthenticated: false,
        authError
    })
};

exports.getSign = async (req, res, next) => {
    let message = await req.consumeFlash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/sign', {
        isAuthenticated: false,
        signError: message
    })
};

exports.postSign = (req, res, next) => {
    const email = req.body.email;
    const signError = validationResult(req);

    if (!signError.isEmpty()) {
        return res
            .status(422)
            .render('auth/sign', {
                isAuthenticated: false,
                signError: signError.array()[0].msg

        })
    }


    User.findOne({where: { email: email } })
        .then(async userCheck => {
            if (userCheck) {
                console.log('user already exist')
                return res.redirect('/login');
            } else {
                try {
                    await req.flash('error', 'foe')
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
            .then(async user => {
                if (!user) {
                    await req.flash('authError', 'invalid credential')
                    return res.redirect('/login')
                }
                bcrypt
                    .compare(password, user.password)
                    .then(async Match => {
                        if (Match) {
                            await req.flash('info', 'your are successfully logged')
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            return res.redirect('/')
                            //return res.status(200).json('good password')
                        }
                        await req.flash('authError', 'invalid credential')
                        res.redirect('/login')
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
    req.session.destroy( err => {
        console.log(err);
        res.redirect('/');
    });
};
