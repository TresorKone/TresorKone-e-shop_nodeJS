const Product = require('../models').Product;

exports.getAddProduct = (req, res, next) => {
    res.render('product/form', {
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    Product.create({
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: price
    })
        .then(r => {
            console.log('Product Created');
            res.redirect('/all-product');
    })
        .catch(err => {
            console.log(err);
        });
};
