const WishlistPurchase = require("../models/WishlistPurchase");

// Validate that an ID is a positive integer
const isValidId = (id) => {
    return /^\d+$/.test(String(id)) && Number(id) > 0;
};

// GET /api/wishlist-purchases
exports.getAllWishlistPurchases = async (req, res, next) => {
    try {
        const purchases = await WishlistPurchase.findAll({
            order: [["purchase_date", "DESC"]],
        });
       
        return res.status(200).json({
            success: true,
            status: 200,
            count: purchases.length,
            data: purchases,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/wishlist-purchases/:id
exports.getWishlistPurchaseById = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid ID",
            });
        }

        const purchase = await WishlistPurchase.findByPk(req.params.id);

        if (!purchase) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Purchase not found",
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            data: purchase,
        });
    } catch (error) {
        next(error);
    }
};