const Koala = require("../models/Koala");

// Validate that an ID is a postive
const isValidId = (id) => {
    return /^\d+$/.test(id) && Number(id) > 0;
};

// GET api/koalas - retrieve all koalas
exports.getAllKoalas = async (req, res, next) => {
    try{
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
    try{
        if (!isValidId(req.params.id)){
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
                success:false,
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
        const { admin_id, koala_name, description, image_url, status } = req.body;

        if (!admin_id || !koala_name || !description || !status) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "admin_id, koala_name, description and status are all required",
            });
        }

        if (!Number.isInteger(Number(admin_id)) || Number(admin_id) <=0) {
            return res.status(400),json({
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
            return res.status(400),json({
                success: false,
                status: 400,
                message: "koala name must be between 1 and 100 characters",
            });
        }

        if (typeof description !== "string" || description.trim().length ===0) {
            return res.status(400),json({
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
            return res.status(400),json({
                success: false,
                status: 400,
                message: "status must be between 1 and 50 characters",
            });
        }

        const koala = await Koala.create({
            admin_id: Number(admin_id),
            koala_name: koala_name.trim(),
            description: description.trim(),
            image_url: image_url || null,
            status: status.trim(),
        });

        return res.status(201).json({
            success: true,
            status: 201,
            message: "Koala created successfully",
            data: koala,
        });
    
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400),json({
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
            return res.status(400),json({
                success: false,
                status: 400,
                message: "Invalid Koala dID",
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
            if (req.body[feild] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object,keys(updates).length === 0) {
            return res.status(400),json({
                success: false,
                status: 400,
                message: "No valid fields provided",
            });
        }

        if (
            updates.koala_name !== undefined &&
            (typeof updates.koala_name !== "string" ||
                updates.koala_name.trim().length === 0 ||
                updates.koala_name.length > 100)
            ) {
                return res.status(400),json({
                success: false,
                status: 400,
                message: "Koala name must be between 1 and 100 characters",
            });
        }

        if (
            updates.description !== undefined &&
            (typeof updates.description !== "string" ||
                updates.description.trim().length === 0)
            ) {
                return res.status(400),json({
                success: false,
                status: 400,
                message: "Description required",
            });
        }

        if (
            updates.status !== undefined &&
            (typeof updates.status !== "string" ||
                updates.status.trim().length === 0 ||
                updates.status.length > 50)
        ) {
            return res.status(400),json({
                success: false,
                status: 400,
                message: "status must be between 1 and 50 characters",
            });
        }

        if (
            updates.image_url !== undefined &&
            updates.image_url !== null &&
            typeof updates.image_url !== "string"
        ) {
            return res.status(400),json({
                success: false,
                status: 400,
                message: "image_url must be a string or null",
            });
        }

        for (const field of Object.keys(updates)) {
            if (typeof updates[field] === "string" && field !== "image_url") {
                updates[field] = updates[field].trim();
            }
        }

        await koala.update(updates);

        return res.status(200),json({
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
            return res.status(400),json({
                success: false,
                status: 400,
                message: "Invalid Koala ID",
            });
        }

        const kaola = await Koala.findByPk(req.params.id);

        if (!koala) {
            return res.status(400),json({
                success: false,
                status: 400,
                message: "sKoala not found",
            });
        }

        await koala.destroy();

        return res.status(200),json({
                success: true,
                status: 200,
                message: "koala deleted successfully",
            });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(409),json({
                success: false,
                status: 409,
                message: "Cannot delete this koala as it is referenced in anouther record",
            });
        }

        next(error);
    }
};