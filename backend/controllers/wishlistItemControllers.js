const WishlistItem = require("../models/WishlistItem");

// Validate that an ID is a postive
const isValidId = (id) => {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
};

// Validate text length
const isValidText = (value, maxLength) => {
    return (
        typeof value === "string" &&
        value.trim().length > 0 &&
        value.trim().length <= maxLength
    );
};

// Validate Item count
const isValidCount = (value) => {
    return value !== "" &&
    Number.isInteger(Number(value)) &&
    Number(value) >= 0;
};

// Validate Price value
const isValidPrice = (value) => {
    return value !== "" &&
    value !== null &&
    Number.isFinite(Number(value)) &&
    Number(value) >= 0;
};

// GET /api/wishlist-items
exports.getAllWishlistItems = async (req, res, next) => {
    try {
        const items = await WishlistItem.findAll();

        return res.status(200).json({
            success: true,
            status: 200,
            count: items.length,
            data: items,
        });
    } catch (error) {
        next (error);
    }
};

// GET api/wishlist-items/:id
exports.getWishlistItemById = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Item ID",
            });
        }

        const item = await WishlistItem.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Item not found",
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/wishlist-items
exports.createWishlistItem = async (req, res, next) => {
    try {
        const {
            item_name,
            item_description,
            item_image_url,
            status,
            number_of_items,
            price,
        } = req.body;

        if (
            !isValidText(item_name, 50) ||
            !isValidText(item_description, 100) ||
            (item_image_url !== undefined &&
                item_image_url !== null &&
                    (typeof item_image_url !== "string" ||
                        item_image_url.length > 100)) ||
            typeof status !== "string" ||
            !isValidCount(number_of_items) ||
            !isValidPrice(price)
        ) {
           return res.status(400).json({
            success: false,
            status: 400,
            message: "Valid wishlist item details required",
           });
        }

        const item = await WishlistItem.create({
            item_name: item_name.trim(),
            item_description: item_description.trim(),
            item_image_url: item_image_url?.trim() || null,
            status,
            number_of_items: Number(number_of_items),
            price: Number(price),
        });

        return res.status(201).json({
            success: true,
            status: 201,
            message: "Wishlist item created successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/wishlist-items/:id
exports.updateWishlistItem = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid ID",
            });
        }

        const item = await WishlistItem.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Wishlist item not found",
            });
        }

        const allowedFields = [
            "item_name",
            "item_description",
            "item_image_url",
            "status",
            "number_of_items",
            "price",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] === undefined) {
                continue;
            }

            const value = req.body[field];

            if (field === "item_name" && isValidText(value, 50)) {
                updates[field] = value.trim();
            } else if (
                field === "item_description" &&
                isValidText(value, 100)
            ) {
                updates[field] = value.trim();
            } else if (field === "item_image_url") {
                if (
                    value === null ||
                    (typeof value === "string" && value.length <= 100)
                ) {
                    updates[field] = value === null ? null : value.trim() || null;
                } else {
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        message: "image url mustbe a string of no more than 100 characters or null",
                    });
                }
            } else if (field === "status") {
                if (typeof value === "string" && value.length === 1) {
                    updates[field] = value;
                } else {
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        message: "status must be exactly 1 character",
                    });
                }
            } else if (field === "number_of_items") {
                if (isValidCount(value)) {
                    updates[field] = Number(value);
                } else {
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        message: "Number of items must not be neagative"
                    });
                }
            } else if (field === "price") {
                if (isValidPrice(value)) {
                    updates[field] = Number(value);
                } else {
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        message: "price must not be a negative",
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: `${field} must be within the allowed length`,
                });
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "At least one field must be provided"
            });
        }

        await item.update(updates);

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Wishlist item updated",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE api/wishlistitem/:id
exports.deleteWishlistItem = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Item ID",
            });
        }

        const item = await WishlistItem.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Wishlist item not found",
            });
        }

        await item.destroy();

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Wishlist item deleted",
        });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(409).json({
                success: false,
                status: 409,
                message: "Cannot delete as this item is referenced by a purchase"
            });
        }

        next(error);
    }
};