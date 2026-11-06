const { body } = require('express-validator');
// Input server-side validation middleware for login and register.

const loginInputValidation = [
    body('email').trim().isEmail().withMessage('Invalid email address.'),

    body('password').notEmpty().withMessage('Password is required.')
];

module.exports = loginInputValidation