const User = require('../models').Product;
//var User = require('../models').User;

exports.getHome = (req, res, next) => {
    res.render('home')
}

exports.getIndexProduct = (req, res, next) => {
    User.findAll()
        .then(products => {
            res.render('product/index', {
                productArray: products
            });
        })
        .catch(err => {
            console.log(err)
        });
};