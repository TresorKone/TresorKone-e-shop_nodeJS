const Product = require('../models').Product;
const { flash } = require('express-flash-message');
//var User = require('../models').User;

exports.getHome = async (req, res, next) => {
    const info = await req.consumeFlash('info');
    res.render('home', {
        info


    })
}

exports.getIndexProduct = async (req, res, next) => {
    const info = await req.consumeFlash('info');
    Product.findAll()
        .then(products => {
            res.render('product/index', {
                productArray: products,
                info
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    if (req.session.user === undefined) {
       return Product.findByPk(prodId)
            .then(product => {
                res.render('product/show', {
                    product: product,
                    pageTitle: product.name
                })
            })
            .catch(err => console.log(err));
    } else {
        const showButtons = req.session.user.role;

        Product.findByPk(prodId)
            .then(product => {
                res.render('product/show', {
                    product: product,
                    pageTitle: product.name,
                    showButtons: showButtons
                })
            })
            .catch(err => console.log(err));
    }

};