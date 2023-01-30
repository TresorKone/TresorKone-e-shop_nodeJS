const path = require('path');

const express = require('express');

const userController = require('../controllers/user')

const router = express.Router();

router.get('/', userController.getHome);

router.get('/all-product', userController.getIndexProduct);

router.get('/all-product/:productId', userController.getProduct);

router.get('/add-cart/:id', userController.getCart );

router.get('/cart', userController.getCartIndex);

router.get('/checkout', userController.getCheckout);

router.get('/checkout',  userController.postCheckout);


module.exports = router;