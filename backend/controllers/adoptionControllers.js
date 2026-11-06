const Adoption = require("../models/Adoption");

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

// Validate amount
const isValidAmount = (value) => {
    return (
        value !== null &&
        value !== "" &&
        (typeof value === "number" || typeof value === "string") &&
        Number.isFinite(Number(value)) &&
        Number(value) >= 0
    );
};

// GET api/adoptions
exports.getAllAdoptions = async (req, res, next) => {
    try {
        const adoptions = await Adoption.findAll();

        return res.status(200).json({
            success: true,
            status: 200,
            count: adoptions.length,
            data: adoptions,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/adoptions/id
exports.getAdoptionById = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid ID",
            });
        }

        const adoption = await Adoption.findByPk(req.params.id);

        if (!adoption) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Adoption not found",
            });
        }

        return res.status(200).json({
                success: true,
                status: 200,
                data: adoption,
        });
    } catch (error) {
        next (error);
    }
};

// POST /api/adoptions
exports.createAdoption = async (req, res, next) => {
    try {
        const {
            customer_id,
            koala_id,
            status,
            amount,
            payment_method,
            transaction_reference,
        } = req.body;

        if (
            !isValidId(customer_id) ||
            !isValidId(koala_id) ||
            !isValidText(status, 50) ||
            !isValidAmount(amount) ||
            !isValidText(payment_method, 50) ||
            (transaction_reference !== undefined &&
                transaction_reference !== null &&
                (typeof transaction_reference !== "string" ||
                    transaction_reference.length > 255))
        ) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Valid adoption details are required",
            });
        }

        const adoption = await Adoption.create({
            customer_id: Number(customer_id),
            koala_id: Number(koala_id),
            status: status.trim(),
            amount: Number(amount),
            payment_method: payment_method.trim(),
            transaction_reference:
                transaction_reference?.trim() || null,
        });

        return res.status(201).json({
                success: true,
                status: 201,
                message: "Adoption recorded",
                data: adoption,
        });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(409).json({
                success: false,
                status: 409,
                message: "Customer or Koala ID does not exist",
            });
        }

    next(error);
    }
};