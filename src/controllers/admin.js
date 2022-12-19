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
                product: product
            })
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const nameEdit = req.body.name;
    const descriptionEdit = req.body.description;
    const imageUrlEdit = req.body.imageUrl;
    const priceEdit = req.body.price;
    Product.findByPk(prodId)
        .then(product => {
            product.name = nameEdit;
            product.description = descriptionEdit;
            product.imageUrl = imageUrlEdit;
            product.price = priceEdit;
            return product.save();
        })
        .then(r => {
            console.log('Product Updated!');
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
        .then(result => {
            console.log('Product Deleted');
            res.redirect('all-product');
        })
        .catch(err => console.log(err));
};
