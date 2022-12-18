const path = require('path');

const express = require('express');

const userController = require('../controllers/user')

const router = express.Router();

router.get('/', userController.getHome);

router.get('/all-product', userController.getIndexProduct);

router.get('/all-product/:productId', userController.getProduct);

module.exports = router;