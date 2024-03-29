const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const checkAuth = require('../middleware/check-auth');

const { permit } = require("../middleware/authorization");

const router = express.Router();

router.get('/add-product', checkAuth , adminController.getAddProduct);

router.get('/edit-product/:productId', permit("admin") ,checkAuth, adminController.getEditProduct);

router.post('/add-product', permit("admin"),checkAuth, adminController.postAddProduct);

router.post('/edit-product', permit("admin"),checkAuth, adminController.postEditProduct);

router.post('/delete-product', permit("admin"),checkAuth, adminController.postDeleteProduct);

module.exports = router;
