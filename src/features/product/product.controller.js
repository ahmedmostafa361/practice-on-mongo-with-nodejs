const { createProductService ,getAllProductsService} = require('./product.service');
const createProductController = async (req,res,next) =>{
    try {
        const insertedId = await createProductService(req.body);
        res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: insertedId
        });

    }catch (error) {
        next(error);
    }
}
const getProductsController = async (req,res,next) =>{
    try {
        const products = await getAllProductsService(req.query.page , req.query.limit);
        res.status(201).json({
            message: "gets all products successfully",
            success: true,
            data: products
        });
    }catch (error) {
        next(error);
    }
}
module.exports = {createProductController , getProductsController};