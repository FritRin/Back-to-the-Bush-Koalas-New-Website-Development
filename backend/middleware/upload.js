const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const FileType = import("file-type");

const allowedTypes = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueName = crypto.randomBytes(16).toString("hex") + extension;

        cb(null, uniqueName);
    }
});

const multerUpload = multer({
    storage,
    
    limits: {
        fileSize: 15 * 1024 * 1024,
        files: 10,
    },

    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const extensions = allowedTypes[file.mimetype];

        if (!extensions || !extensions.includes(extension)) {
            return cb(new Error("Only JPEG or PNG images are accepted"));
        }

        cb(null, true);
    }
});

// Check the actual contents of the uploaded files
const validateContent = async (req) => {
    const files = req.files || (req.file ? [req.file] : []);

    for (const file of files) {
        const { fileTypeFromFile } = await FileType;
        const detectedType = await fileTypeFromFile(file.path);

        if (!detectedType || !allowedTypes[detectedType.mime]) {
            throw new Error("Invalid image content. Only JPEG and PNG allowed");
        }

        if (detectedType.mime !== file.mimetype) {
            throw new Error ("The uploaded file does not match its content");
        }
    }
};

// Wrap multer so the content is validated after the upload
const secureUpload = (middleware) => {
    return (req, res, next) => {
        middleware(req, res, async (err) => {
            if (err) {
                let message = "Unable to upload images";

                if (err.code === "LIMIT_FILE_SIZE") {
                    message = "Images must be 5 MB or smaller.";
                } else if (err.code === "LIMIT_FILE_COUNT") {
                    message = "Too many images uploaded.";
                } else if (err.message === "Only JPEG or PNG images are accepted") {
                    message = err.message;
                }

                return res.status(400).json({
                    success: false,
                    message,
                });
            }

            try {
                await validateContent(req);
                next();
            } catch (error) {
                const files = req.files || (req.file ? [req.file] : []);

                await Promise.all(
                    files.map(file => fs.promises.unlink(file.path).catch(() => {}))
                );

                const allowedMessages = [
                    "Invalid image content. Only JPEG and PNG allowed",
                    "The uploaded file does not match its content",
                ];

                return res.status(400).json({
                    success: false,
                    message: allowedMessages.includes(error.message)
                        ? error.message
                        : "Unable to validate uploaded images",
                });
            }
        });
    };
};

const upload = {
    array: (...args) => secureUpload(multerUpload.array(...args)),
    single: (...args) => secureUpload(multerUpload.single(...args)),
};

module.exports = upload;