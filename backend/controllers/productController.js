import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @whatitdoes fetch all products
//@route GET/api/products
// @access Public
const getProducts = asyncHandler( async (req,res)=> {
    const products = await Product.find({});  
    
    res.json(products);

});

// @whatitdoes fetch a product
//@route GET/api/products/:id
// @access Public

const getProductById = asyncHandler( async (req,res)=> {
    const product = await Product.findById(req.params.id);

    if (product){
   return  res.json(product);
    }
    res.status(404);
    throw new Error('Ressource not Found');

});

// @whatitdoes fetch a product
//@route GET/api/products/:id
// @access Public

const getTopProducts = asyncHandler( async (req,res)=> {
    const products = await Product.find({}).sort({rating:-1}).limit(3);

    res.status(200).json(products);


});

export {getProducts,getProductById,getTopProducts};