const Customer = require("../models/Customer");

// Validate that an ID is a postive
const isValidId = (id) => {
    return /^\d+$/.test(id) && Number(id) > 0;
};

// GET /api/customers
exports.getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.findAll();

        return res.status(200).json({
            success: true,
            status: 200,
            count: customers.length,
            data: customers,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/customers/:id
exports.getCustomerById = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Customer ID",
            });
        }

        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Customern not found",
            });
        } 

        return res.status(200).json({
            success: true,
            status: 200,
            data: customer,
    });
                
    } catch (error) {
        next(error);
    }
};

// POST /api/customers
exports.createCustomer = async (req, res, next) => {
    try {
        const allowedFields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "street_number",
            "street_name",
            "suburb",
            "state",
            "postcode",
            "country",
            "company_name",
        ];

        const customerData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                const value = req.body[field];

                if (value !== null && typeof value !== "string") {
                    return res.status(400).json({
                        success: false,
                        status: 400,
                        message: `${field} must be a string or null`,
                    });
                }

                customerData[field] = 
                    typeof value === "string" ? value.trim() : value;
            }
        }

        if (Object.keys(customerData).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "At least one customer must be provided",
            });
        }

        const customer = await Customer.create(customerData);
            return res.status(400).json({
            success: true,
            status: 200,
            message: "Customer created",
            data: customer,
        });
    } catch (error) {
        next(error);
    }
};