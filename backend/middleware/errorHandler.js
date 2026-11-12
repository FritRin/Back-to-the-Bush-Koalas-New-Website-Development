function errorHandler(err, req, res, next){
    console.error("Internal Server Error:", err);

    res.status(500).json({
        success: false,
        status: 500,
        message: "Internal Server Error",
    });
}

module.exports = errorHandler;