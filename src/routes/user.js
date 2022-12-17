const path = require('path');

const express = require('express');

const userController = require('../controllers/user')

const router = express.Router();

router.get('/all-product', userController.getIndexProduct);

router.get('/', userController.getHome);

module.exports = router;