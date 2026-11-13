const Koala = require("../models/Koala");
const fs = require('fs');
const path = require('path');

// Validate that an ID is a postive
const isValidId = (id) => {
    return /^\d+$/.test(id) && Number(id) > 0;
};

// GET api/koalas - retrieve all koalas
exports.getAllKoalas = async (req, res, next) => {
    try {
        const koalas = await Koala.findAll();

        return res.status(200).json({
            success: true,
            status: 200,
            count: koalas.length,
            data: koalas,
        });
    } catch (error) {
        next(error);
    }
};

// GET api/koalas/id - get koala by VALID ID
exports.getKoalaById = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Koala ID",
            });
        }

        const koala = await Koala.findByPk(req.params.id);

        //If not matching throw error
        if (!koala) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Koala not found",
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            data: koala,
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/koalas - Create a new koala
exports.createKoala = async (req, res, next) => {
    try {
        const { admin_id, koala_name, description, status } = req.body;

        if (!admin_id || !koala_name || !description || !status) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "admin_id, koala_name, description and status are all required",
            });
        }

        if (!Number.isInteger(Number(admin_id)) || Number(admin_id) <= 0) {
            return res.status(400), json({
                success: false,
                status: 400,
                message: "admin_id must be a postive",
            });
        }

        if (
            typeof koala_name !== "string" ||
            koala_name.trim().length === 0 ||
            koala_name.length > 100
        ) {
            return res.status(400), json({
                success: false,
                status: 400,
                message: "koala name must be between 1 and 100 characters",
            });
        }

        if (typeof description !== "string" || description.trim().length === 0) {
            return res.status(400), json({
                success: false,
                status: 400,
                message: "Description required",
            });
        }

        if (
            typeof status !== "string" ||
            status.trim().length === 0 ||
            status.length > 50
        ) {
            return res.status(400), json({
                success: false,
                status: 400,
                message: "status must be between 1 and 50 characters",
            });
        }

        // allow to store only  one image in backend/public/images
        let image_url = null;

        if (req.files && req.files.length > 0) {
            image_url = `/images/${req.files[0].filename}`;
        }

        console.log(req.body);
        console.log(req.files);
        console.log("Before Koala.create");
        console.log("Image URL:", image_url);

        const koala = await Koala.create({
            admin_id: Number(admin_id),
            koala_name: koala_name.trim(),
            description: description.trim(),
            image_url,
            status: status.trim(),
        });

        console.log("After Koala.create");
        console.log(req.body);
        console.log(req.files);
        console.log("Image URL:", image_url);


        return res.status(201).json({
            success: true,
            status: 201,
            message: "Koala created successfully",
            data: koala,
        });

    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400), json({
                success: false,
                status: 400,
                message: "This admin_id does not exist",
            });
        }

        next(error);
    }
};

// PUT api/koalas/id - Update a koala
exports.updateKoala = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Koala ID",
            });
        }

        const koala = await Koala.findByPk(req.params.id);

        if (!koala) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Koala not found",
            });
        }

        const allowedFields = [
            "koala_name",
            "description",
            "image_url",
            "status",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        //  Handle new image upload & delete old file from disk
        if (req.files && req.files.length > 0) {
            const newFilename = req.files[0].filename;

            // Delete existing image file from backend/public/images
            if (koala.image_url) {
                // Extract filename from stored path (for example in "backend/public/images/old.png -> new.png)
                const oldFilename = path.basename(koala.image_url);
                const oldFilePath = path.join(__dirname, '../public/images', oldFilename);

                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.warn(`Warning: Could not delete old file at ${oldFilePath}:`, err.message);
                    } else {
                        console.log(`Deleted old image file: ${oldFilename}`);
                    }
                });
            }

            // Set new relative path for DB
            updates.image_url = `/images/${newFilename}`;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "No valid fields provided",
            });
        }

        if (
            updates.koala_name !== undefined &&
            (
                typeof updates.koala_name !== "string" ||
                updates.koala_name.trim().length === 0 ||
                updates.koala_name.length > 100
            )
        ) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Koala name must be between 1 and 100 characters",
            });
        }

        if (
            updates.description !== undefined &&
            (
                typeof updates.description !== "string" ||
                updates.description.trim().length === 0
            )
        ) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Description required",
            });
        }

        if (
            updates.status !== undefined &&
            (
                typeof updates.status !== "string" ||
                updates.status.trim().length === 0 ||
                updates.status.length > 50
            )
        ) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Status must be between 1 and 50 characters",
            });
        }

        if (
            updates.image_url !== undefined &&
            updates.image_url !== null &&
            typeof updates.image_url !== "string"
        ) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "image_url must be a string or null",
            });
        }

        for (const field of Object.keys(updates)) {
            if (
                typeof updates[field] === "string" &&
                field !== "image_url"
            ) {
                updates[field] = updates[field].trim();
            }
        }

        await koala.update(updates);
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Koala has been updated",
            data: koala,
        });

    } catch (error) {
        next(error);
    }
};

// DELETE /api/koalas/:id - Delete a koala
exports.deleteKoala = async (req, res, next) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Koala ID",
            });
        }

        const koala = await Koala.findByPk(req.params.id);

        if (!koala) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Koala not found",
            });
        }

        if (koala.image_url) {
            const filename = path.basename(koala.image_url);
            const filePath = path.join(__dirname, '../public/images', filename);

            fs.unlink(filePath, (err) => {
                if (err) console.warn(`File cleanup failed at ${filePath}:`, err.message);
                else console.log(`Deleted image file: ${filename}`);
            });
        }

        await koala.destroy();

        return res.status(200).json({
            success: true,
            status: 200,
            message: "koala deleted successfully",
        });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(409).json({
                success: false,
                status: 409,
                message: "Cannot delete this koala as it is referenced in anouther record",
            });
        }

        next(error);
    }
};