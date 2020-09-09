const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../../controllers/auth");

const { getToken, processPayment } = require("../../controllers/payment/payment");

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
    "/payment/braintree/:userId",
    isSignedIn,
    processPayment
);

module.exports = router;
