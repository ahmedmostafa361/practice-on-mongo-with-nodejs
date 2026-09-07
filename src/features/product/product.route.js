const {Router} = require('express');
const productRouter = Router();

const {createProductController, getProductsController} = require('./product.controller');
productRouter.post('/create', createProductController);
productRouter.get('/', getProductsController);
module.exports = productRouter;