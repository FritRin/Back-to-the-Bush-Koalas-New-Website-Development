const Koala = require("../models/Koala");

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

// GET api/koalas/id - get koala by ID
exports.getKoalaById = async (req, res, next) => {
    try{
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