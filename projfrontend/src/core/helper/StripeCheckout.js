import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./cartHelper";
import { Link } from "react-router-dom";
import CheckoutStripe from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "./orderHelper";

const StripeCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getAllPrice = () => {
        const total = products.reduce((sum, current) => sum + current.price, 0);
        return total;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
            //
        }).catch(err => console.log(err))
    }

    const showStripeCheckout = () => {
        return (
            isAuthenticated() ?
                <CheckoutStripe
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    token={makePayment}
                    amount={getAllPrice() * 100}
                    name="Buy from KU store"
                    // shippingAddress
                    // billingAddress
                >
                    <button className="btn btn-success">Pay with Stripe</button>
                </CheckoutStripe> :
                <Link to="/signin" className="btn btn-warning">Sign in</Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Total Amount is: {getAllPrice()} $</h3>
            {showStripeCheckout()}
        </div>
    );
}

export default StripeCheckout;
