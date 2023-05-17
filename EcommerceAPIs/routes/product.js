const Product = require("../models/Product");
const Category = require('../models/Category');

const {
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin
} = require("./verifyToken");

const router = require("express").Router();

//Create Product
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Product
router.put("/:id", verifyTokenAndAdmin, async (req, res, next)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);        
    } catch (error) {
        res.status(500).json(error)
    }
});

// //Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted successfuly.")
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get Product
router.get("/find/:id", async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get All Products
router.get("/", async (req, res) =>{
    const querySort = req.query.sort;
    console.log(querySort);
    try {
        let products;
        if(querySort == 'asc'){
            products = await Product.find().sort({ price: 1 });
            console.log(products);
        }else if(querySort == 'desc'){
            products = await Product.find().sort({ price: -1 });

        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/categories', async (req, res) =>{
    let category = await Category.find();
    res.status(200).json({
        message: 'Categories retreived.',
        categories: category
    })
});

router.post('/create-category',async (req, res) =>{
    const newCategory = new Category({
        categoryType:req.body.categoryType,
        img: req.body.img
    });
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/category/:category', async(req, res)=>{
    const rCategory = req.params.category;

    try {
        const products = await Product.find({ category: rCategory });
        console.log(products);
        res.status(200).json({
            message: 'Products belong to this category retreived successfuly.',
            products: products
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;