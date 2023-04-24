const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin
} = require("./verifyToken");

const router = require("express").Router();

//Create Cart
router.post("/", verifyToken, async (req, res)=>{
    const newCart = new Product(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next)=>{
    try {
        const updatedCart = await User.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);        
    } catch (error) {
        res.status(500).json(error)
    }
});

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) =>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted successfuly.")
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) =>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get All Carts
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;