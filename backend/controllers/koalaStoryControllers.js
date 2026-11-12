const KoalaStory = require("../models/KoalaStory");

// Validate that an ID is a postive
const isValidId = (id) => {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
};

// GET /api/koala-stories
exports.getAllKoalaStories = async (req, res, next) => {
  try {
    const stories = await KoalaStory.findAll();

    return res.status(200).json({
      success: true,
      status: 200,
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    next(error);
  }
};

// GET api/koala-stories/id
exports.getKoalaStoryById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid Koala Story ID",
      });
    }

    const story = await KoalaStory.findByPk(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Koala story not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/koala-stories
exports.createKoalaStory = async (req, res, next) => {
  try {
    const { koala_id, admin_id, title, content } = req.body;

    if (
      !isValidId(koala_id) ||
      !isValidId(admin_id) ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Valid entries are required",
      });
    }

    const story = await KoalaStory.create({
      koala_id: Number(koala_id),
      admin_id: Number(admin_id),
      title: title.trim(),
      content: content.trim(),
    });

    return res.status(201).json({
        success: true,
        status: 201,
        message: "koala Story has been created",
        data: story,
    });
  } catch (error) {
    next(error);
  }
};

// PUT apo/koala-stories/:od
exports.updateKoalaStory = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid Story ID",
      });
    }

    const story = await KoalaStory.findByPk(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Story not found",
      });
    }

    const allowedFields = ["koala_id", "admin_id", "title", "content"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        const value = req.body[field];

        if (field === "koala_id" || field === "admin_id") {
          if (!isValidId(value)) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: `${field} must be a valid positive interger`,
            });
          }
          updates[field] = Number(value);
        } else {
          if (typeof value !== "string" || !value.trim()) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: `${field} must not be empty`,
            });
          }
          updates[field] = value.trim();
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "At least one field must be updated",
      });
    }

    await story.update(updates);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Story updated",
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/koala-stories/:id
exports.deleteKoalaStory = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "invalid Story ID"
            });
        }

        const story = await KoalaStory.findByPk(req.params.id);

        if (!story) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Story Not found",
            });
        }

        await story.destroy();

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Story has been deleted",
        });
    } catch (error) {
        next(error);
    }
};