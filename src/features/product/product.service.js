const { createProduct,getAllProducts } = require('./product.repo');
const {ObjectId} = require("mongodb");
const createProductService = async (productData) => {
    /// prepare product data
    productData.name = productData.name.trim();
    productData.createdAt = new Date();
    productData.updatedAt = new Date();
    productData.status = 'active';
    productData.userId = new ObjectId(productData.userId);
    /// 1. create product => save into db
    const insertedId = await createProduct(productData);
    if(!insertedId) throw new Error('Product not created');
    return insertedId;
};
const getAllProductsService = async (page=1 , limit =5) => {
    const skip = (page-1)*limit;
    if(skip < 0) throw new Error('Invalid page number');
    if(limit <= 0) throw new Error('Invalid limit number');
    const products = await getAllProducts(limit,skip);
    if(!products) throw new Error('No products found');
    return products;
}
module.exports = {createProductService,getAllProductsService};