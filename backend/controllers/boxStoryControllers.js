const BoxStory = require("../models/BoxStory");
const KoalaStory = require("../models/KoalaStory");

// Validate that an ID is a postive
const isValidId = (id) => {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
}

// GET /api/box-story 

exports.getAllBox = async (req, res, next) => {
  try {
    const box = await BoxStory.findAll({
      include: [
        {
          model: KoalaStory,
          as: "story", // Must match the "as" alias in BoxStory.belongsTo
        },
      ],
    });

    return res.status(200).json({
      success: true,
      status: 200,
      count: box.length,
      data: box,
    });
  } catch (error) {
    next(error);
  }
};


// GET api/box-story/id
exports.getBoxById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid box ID",
      });
    }

    const box = await BoxStory.findByPk(req.params.id, {
      include: [
        {
          model: KoalaStory,
          as: "story",
        },
      ],
    });

    if (!box) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "box not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      data: box,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/box-story
exports.createBox = async (req, res, next) => {
  try {
    const { story_id, admin_id, slot } = req.body;

    if (
      !isValidId(story_id) ||
      !isValidId(admin_id) ||
      typeof slot !== "string" ||
      !slot.trim()
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Valid entries are required",
      });
    }

    const box = await BoxStory.create({
      story_id: Number(story_id),
      admin_id: Number(admin_id),
      slot: slot.trim()
    });


    return res.status(201).json({
      success: true,
      status: 201,
      message: "box has been created",
      data: box,
    });
  } catch (error) {
    next(error);
  }
};

// PUT apo/box-story/:id
exports.updateBox = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid box ID",
      });
    }

    const box = await BoxStory.findByPk(req.params.id);

    if (!box) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "box not found",
      });
    }

    const allowedFields = [
      "box_id",
      "story_id",
      "admin_id",
      "slot"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] === undefined) {
        continue;
      }

      const value = req.body[field];

      // Validate IDs
      if (field === "story_id" || field == "admin_id") {
        if (!isValidId(value)) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `${field} must be a valid positive integer`,
          });
        }

        updates[field] = Number(value);
        continue;
      }

      // Validate strings
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: `${field} must not be empty`,
        });
      }

      updates[field] = value.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "At least one field must be updated",
      });
    }

    await box.update(updates);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Story updated",
      data: box,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/box-story/:id
exports.deleteBox = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "invalid box ID"
      });
    }

    const box = await BoxStory.findByPk(req.params.id);

    if (!box) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "box Not found",
      });
    }

    await box.destroy();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "box has been deleted",
    });
  } catch (error) {
    next(error);
  }
};