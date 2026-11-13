const Donation = require("../models/Donation");

// Validate that ID is a postive
const isValidId = (id) => {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
};

// Sanitise text
const normaliseText = (value) => {
  return value
    .normalize("NFC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .replace(/\s+/g, " ");
};

// Validate that test is not empty
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

// Validate currency code
const isValidCurrency = (value) => {
  return typeof value === "string" && /^[A-Za-z]{3}$/.test(value);
};

// GET /api/donations
exports.getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.findAll();

    return res.status(200).json({
      success: true,
      status: 200,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/donations/:id
exports.getDonationById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid ID",
      });
    }

    const donation = await Donation.findByPk(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "This donation was not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/donations
exports.createDonation = async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "A valid donation object is required",
      });
    }
    const {
      customer_id,
      currency,
      amount,
      payment_method,
      transaction_reference,
    } = req.body;

    const cleanPaymentMethod =
      typeof payment_method === "string" ? normaliseText(payment_method) : "";

    const cleanTransactionReference =
      typeof transaction_reference === "string"
        ? normaliseText(transaction_reference)
        : transaction_reference;

    if (
      !isValidId(customer_id) ||
      !isValidCurrency(currency) ||
      !isValidAmount(amount) ||
      !isValidText(cleanPaymentMethod, 50) ||
      /[<>]/.test(cleanPaymentMethod) ||
      /javascript:/i.test(cleanPaymentMethod) ||
      (transaction_reference !== undefined &&
        transaction_reference !== null &&
        (typeof transaction_reference !== "string" ||
          cleanTransactionReference.length > 100 ||
          /[<>]/.test(cleanTransactionReference) ||
          /javascript:/i.test(cleanTransactionReference)))
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Valid details are required",
      });
    }

    const donation = await Donation.create({
      customer_id: Number(customer_id),
      currency: currency.toUpperCase(),
      amount: Number(amount),
      payment_method: cleanPaymentMethod,
      transaction_reference: cleanTransactionReference || null,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Donation has been recorded",
      data: donation,
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Customer ID does not exist",
      });
    }

    next(error);
  }
};
