const path = require('path');

const express = require('express');

const authController = require('../controllers/auth')

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/sign', authController.getSign);

router.post('/sign', authController.postSign);

module.exports = router;