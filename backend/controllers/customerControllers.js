const Customer = require("../models/Customer");

// Validate that an ID is a postive
const isValidId = (id) => {
  return /^\d+$/.test(id) && Number(id) > 0;
};

// Validate all fields
const FIELD_LIMITS = {
  first_name: 50,
  last_name: 50,
  email: 255,
  phone: 20,
  street_number: 20,
  street_name: 50,
  suburb: 50,
  state: 50,
  postcode: 20,
  country: 50,
  company_name: 100,
};

const normaliseText = (value) =>
  value
    .normalize("NFC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .replace(/\s+/g, " ");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,20}$/;
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;

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

        if (value === null) {
          customerData[field] = null;
          continue;
        }

        const cleanValue = normaliseText(value);

        if (!cleanValue) {
          customerData[field] = null;
          continue;
        }

        if (cleanValue.length > FIELD_LIMITS[field]) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `${field} exceeds the maximum length of ${FIELD_LIMITS[field]} characters`,
          });
        }

        if (/[<>]/.test(cleanValue) || /javascript:/i.test(cleanValue)) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `${field} contains invalid characters`,
          });
        }

        if (
          ["first_name", "last_name"].includes(field) &&
          !NAME_PATTERN.test(cleanValue)
        ) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `${field} contains invalid characters`,
          });
        }

        if (field === "email" && !EMAIL_PATTERN.test(cleanValue)) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "Please enter a valid email address",
          });
        }

        if (field === "phone" && !PHONE_PATTERN.test(cleanValue)) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "Please enter a valid phone number",
          });
        }

        customerData[field] =
          field === "email" ? cleanValue.toLowerCase() : cleanValue;
      }
    }
    // Check if email already exists, and will not create a new duplicate entry.
    if (customerData.email) {
      const existing = await Customer.findOne({ where: { email: customerData.email } });
      if (existing) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "This email is already in use",
          data: { customer_id: existing.customer_id },
        });
      }
    }

    if (!Object.values(customerData).some(value => value !== null && value !== "")) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "At least one customer must be provided",
      });
    }

    const customer = await Customer.create(customerData);
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Customer created",
      data: customer,
    });
  } catch (error) {
    // Similar duplicate email check but as an error handler
    if (error.name === "SequelizeUniqueConstraintError") {
      const email = String(req.body?.email || "").trim().toLowerCase();
      const existing = await Customer.findOne({ where: { email } });
      if (existing) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "This email is already in use",
          data: { customer_id: existing.customer_id },
        });
      }
    }
    next(error);
  }
};
