const express = require("express");
const router = express.Router();

const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Fired automatically as soon as /product/:productId route is hit
//All of our params
router.param("productId", getProductById);
router.param("userId", getUserById);


//Create Operation
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);


//All Read Operation
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

//update route
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);


module.exports = router;
