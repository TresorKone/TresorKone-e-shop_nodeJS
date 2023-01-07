const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const checkAuth = require('../middleware/check-auth')

const router = express.Router();

router.get('/add-product', checkAuth , adminController.getAddProduct);

router.get('/edit-product/:productId', checkAuth, adminController.getEditProduct);

router.post('/add-product', checkAuth, adminController.postAddProduct);

router.post('/edit-product', checkAuth, adminController.postEditProduct);

router.post('/delete-product', checkAuth, adminController.postDeleteProduct);

module.exports = router;
