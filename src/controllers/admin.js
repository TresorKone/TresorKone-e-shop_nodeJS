const { flash } = require('express-flash-message');

const Product = require('../models').Product;

exports.getAddProduct = (req, res, next) => {
    res.render('product/form', {
        editing: false,
        //isAuthenticated: req.session.isLoggedIn
    });
};

exports.postAddProduct = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.files.image;
    const imageName = image.name
    const price = req.body.price;

    await image.mv('./uploads/' + imageName)

    Product.create({
        name: name,
        description: description,
        imageUrl: image.tempFileDir,
        price: price,
        userId: req.session.user.id
    })
        .then(async r => {
            console.log('Product Created');
            await req.flash('info', 'product successful added')
            res.redirect('/all-product');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editing;
    if (!editMode) {
        return res.redirect('/all-product');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('product/form', {
                editing: editMode,
                product: product,
                //isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    const nameEdit = req.body.name;
    const descriptionEdit = req.body.description;
    const image = req.files.image;
    const imageName = image.name
    const priceEdit = req.body.price;

    await image.mv('./uploads/' + imageName)

    Product.findByPk(prodId)
        .then(product => {
            product.name = nameEdit;
            product.description = descriptionEdit;
            product.imageUrl = image.tempFileDir;
            product.price = priceEdit;
            return product.save();
        })
        .then(async r => {
            console.log('Product Updated!');
            await req.flash('info', 'product successful edited')
            res.redirect('/all-product');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(r => {
            console.log('Product Deleted');
            res.redirect('/all-product');
        })
        .catch(err => console.log(err));
};
