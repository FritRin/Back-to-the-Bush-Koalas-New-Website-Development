const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const loginInputValidation = require('../middleware/validateMiddleware');

router.post('/login', loginInputValidation, authController.login);
router.post('/logout', authController.logout);

module.exports = router;