const jwt = require('jsonwebtoken');
// Authenticate middleware to secure the endpoints, making it unable to be requested if not logged in.
const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                error: 'Authentication required'
            });
        }

        req.user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
};

module.exports = authenticate;