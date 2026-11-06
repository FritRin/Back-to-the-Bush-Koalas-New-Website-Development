const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Validation middleware.
const { validationResult } = require('express-validator');

const Admin =  require('../models/Admin');

exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const { email, password } = req.body;

        let user = null;
        let userID = null;
        // Find the provided email in the admin table.
        user = await Admin.findOne({
                where: { email }
            });

        if (user) {
            userID = user.admin_id;
        }

        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password.'
            });
        }
        // Compare the inputted password and the saved hashed password.
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid email or password.'
            });
        }
        // Sign the JWT token with the userID and the role of the user that expires in 1 hour.
        const token = jwt.sign(
            {
                id: userID
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );
        // Add that token to a HTTP only cookie that also only last for 1 hour.
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login successful.'
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
};

// Clear out token and cookie for logging out.
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict'
    });

    res.json({
        message: "Logged out successfully."
    });
};