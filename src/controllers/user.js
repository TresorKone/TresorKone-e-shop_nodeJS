const User = require('../models').User;
//var User = require('../models').User;

exports.getIndex = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.render('home', {
                usersArray: users
            });
        })
        .catch(err => {
            console.log(err)
        });
};