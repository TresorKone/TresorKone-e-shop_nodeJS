const Product = require('../models').Product;
//var User = require('../models').User;

exports.getHome = (req, res, next) => {
    res.render('home')
}

exports.getIndexProduct = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('product/index', {
                productArray: products
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId

    Product.findByPk(prodId)
        .then(product => {
            res.render('product/show', {
                product: product,
                pageTitle: product.name
            })
        })
        .catch(err => console.log(err));
};