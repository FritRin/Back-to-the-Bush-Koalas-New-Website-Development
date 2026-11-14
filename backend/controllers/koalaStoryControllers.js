const KoalaStory = require("../models/KoalaStory");
const fs = require('fs');
const path = require('path');

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
    const { admin_id, title, content } = req.body;

    if (
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

    // this variable and if conditons 
    // allows to upload many images in backend/public/images
    let image_urls = [];

    if (req.files?.length > 0) {
      image_urls = req.files.map(
        file => `/images/${file.filename}`
      );
    } else if (
      Array.isArray(req.body.image_urls) &&
      req.body.image_urls.every(
        img => typeof img === "string"
      )
    ) {
      image_urls = req.body.image_urls;
    }

    console.log("Before Koala.create");
    console.log("Image URL:", image_urls);
    console.log(req.body);
    console.log(req.files);

    const story = await KoalaStory.create({
      admin_id: Number(admin_id),
      title: title.trim(),
      content: content.trim(),
      image_urls
    });

    console.log("Before Koala.create");
    console.log("Image URL:", image_urls);
    console.log(req.body);
    console.log(req.files);

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

//POST /api/:id/images
exports.addStoryImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid Story ID",
      });
    }

    const story = await KoalaStory.findByPk(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Story not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "No image uploaded",
      });
    }

    const imageUrls = [...(story.image_urls || [])];

    imageUrls.push(`/images/${req.file.filename}`);

    await story.update({
      image_urls: imageUrls,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Image added successfully",
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

// PUT apo/koala-stories/:id
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

    const allowedFields = [
      "koala_id",
      "admin_id",
      "title",
      "content",
      "image_urls",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] === undefined) {
        continue;
      }

      const value = req.body[field];

      // Validate IDs
      if (field === "koala_id" || field === "admin_id") {
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

      // Validate image_urls array
      if (field === "image_urls") {
        if (
          !Array.isArray(value) ||
          !value.every(
            (img) => typeof img === "string" && img.trim()
          )
        ) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "image_urls must be an array of strings",
          });
        }

        updates.image_urls = value.map((img) => img.trim());
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

    console.log("BODY:", req.body);
    console.log("UPDATES:", updates);

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

exports.updateStoryImage = async (req, res, next) => {
  try {
    const { id, index } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid Story ID",
      });
    }

    const imageIndex = Number(index);

    if (Number.isNaN(imageIndex) || imageIndex < 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid image index",
      });
    }

    const story = await KoalaStory.findByPk(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Story not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "No image uploaded",
      });
    }

    const imageUrls = [...(story.image_urls || [])];

    if (imageIndex >= imageUrls.length) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `Image index ${imageIndex} does not exist`,
      });
    }

    // Delete old image file
    const oldImagePath = imageUrls[imageIndex];

    if (oldImagePath) {
      const oldFilename = path.basename(oldImagePath);

      const fullOldPath = path.join(
        __dirname,
        "../public/images",
        oldFilename
      );

      fs.unlink(fullOldPath, (err) => {
        if (err) {
          console.warn(
            `Could not delete ${oldFilename}:`,
            err.message
          );
        } else {
          console.log(`Deleted old image: ${oldFilename}`);
        }
      });
    }

    // Replace selected image
    imageUrls[imageIndex] = `/images/${req.file.filename}`;

    await story.update({
      image_urls: imageUrls,
    });

    console.log("Story ID:", id);
    console.log("Image Index:", imageIndex);
    console.log("Updated Image Array:", imageUrls);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Image updated successfully",
      data: story,
    });
  } catch (error) {
    next(error);
  }
};


//DELETE /api/stories/:id/images/:index

exports.deleteStoryImage = async (req, res, next) => {
  try {
    const { id, index } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid Story ID",
      });
    }

    const imageIndex = Number(index);

    if (Number.isNaN(imageIndex) || imageIndex < 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid image index",
      });
    }

    const story = await KoalaStory.findByPk(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Story not found",
      });
    }

    const imageUrls = [...(story.image_urls || [])];

    if (imageIndex >= imageUrls.length) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `Image index ${imageIndex} does not exist`,
      });
    }

    // Get image path before removing it
    const imageToDelete = imageUrls[imageIndex];

    // Remove image from array
    imageUrls.splice(imageIndex, 1);

    // Delete file from disk
    if (imageToDelete) {
      const filename = path.basename(imageToDelete);

      const filePath = path.join(
        __dirname,
        "../public/images",
        filename
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn(
            `Could not delete ${filename}:`,
            err.message
          );
        } else {
          console.log(`Deleted image file: ${filename}`);
        }
      });
    }

    await story.update({
      image_urls: imageUrls,
    });

    console.log("Deleted image:", imageToDelete);
    console.log("Updated array:", imageUrls);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Image deleted successfully",
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
        message: "invalid Story ID",
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

    // 1. Copy the image paths before destroying the record
    const imageUrls = Array.isArray(story.image_urls) ? [...story.image_urls] : [];

    // 2. Delete from PostgreSQL first (if foreign key fails, images remain intact)
    await story.destroy();

    // 3. Remove each associated file from public/images
    for (const imgUrl of imageUrls) {
      if (!imgUrl) continue;

      // Extract just the filename (e.g., "/images/photo.jpg" -> "photo.jpg")
      const filename = path.basename(imgUrl);
      const filePath = path.join(__dirname, "..", "public", "images", filename);

      try {
        await fs.promises.unlink(filePath);
      } catch (fileErr) {
        // Ignore ENOENT (file already missing), log other unexpected disk errors
        if (fileErr.code !== "ENOENT") {
          console.error(`Failed to delete file ${filePath}:`, fileErr);
        }
      }
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Story and associated images have been deleted",
    });
  } catch (error) {
    if (
      error.name === "SequelizeForeignKeyConstraintError" ||
      error.parent?.code === "23503"
    ) {
      return res.status(409).json({
        success: false,
        status: 409,
        code: "STORY_IN_USE",
        message:
          "This story is currently posted in a box. Please remove it from the box first.",
      });
    }
    next(error);
  }
};