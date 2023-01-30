const Product = require('../models').Product;
const Cart = require('../data/cart');

const fs = require('fs');
const path = require('path');

const { flash } = require('express-flash-message');
const { join } = require("nunjucks/src/filters");
const PDFDocument = require('pdfkit');


//var User = require('../models').User;

exports.getHome = async (req, res, next) => {
    const info = await req.consumeFlash('info');
    res.render('other/home', {
        info


    })
};

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

exports.getCart = (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findByPk(productId)
        .then(productFetched => {
            cart.add(productFetched, productId);
            req.session.cart = cart;
            res.redirect('/all-product');
        })
        .catch(err => {
            res.redirect('/');
            console.log(err)
        })
};

exports.getCartIndex = (req, res, next) => {
    if (!req.session.cart) {
        return res.render('cart/index', {

        });
    }

    let cart = new Cart(req.session.cart);
    res.render('cart/index', {
        products: cart.generatedArray(),
        totalPrice: cart.totalPrice
    });

};

/*
exports.getInvoice = (req,res, next) => {
    const uId = req.session.user.id
    const invoiceName = 'invoice-' + uId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);

    const pdfDoc = new PDFDocument();
    //setting header
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        'inline; filename="' + invoiceName +'"'
    )

    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);

    pdfDoc.text('hello world');

    pdfDoc.end()

    fs.readFile(invoicePath, (err, data) => {
        if (err) {
            return next(err);
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    });
};

 */

exports.getCheckout = (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }

    let cart = new Cart(req.session.cart);
    res.render('cart/checkout', {
        //products: cart.generatedArray(),
        totalPrice: cart.totalPrice
    });
}

exports.postCheckout = (req, res, next) => {

    /*
     Logic to make charger with the stipe package installed will go here
     if needed for production
     */


}