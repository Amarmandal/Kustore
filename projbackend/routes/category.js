const express = require("express");
const router = express.Router();

const {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory
} = require("../controllers/category");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routers goes here

//Create Route
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

//Read Route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update Route
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);


//Delete Route
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
);

module.exports = router;
