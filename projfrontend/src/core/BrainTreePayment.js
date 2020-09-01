import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BrainTreePayment = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            // console.log("INFORMATION", info);
            if (info !== undefined) {
                if (info.error) {
                    setInfo({ ...info, error: info.error });
                } else {
                    const clientToken = info.clientToken;
                    setInfo({ clientToken });
                }
            }

        })
    }

    const getAllPrice = () => {
        if (products !== undefined) {
            const total = products.reduce((sum, current) => sum + current.price, 0);
            return total;
        }
    }

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAllPrice()
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setInfo({...info, success: response.success, loading: false});
                        console.log("PAYMENT SUCCCESS");
                        // const orderData = {
                        //     products: products,
                        //     transaction_id: response.transaction.id,
                        //     amount: response.transaction.amount,

                        // }
                        // createOrder(userId, token, orderData);
                        cartEmpty(() => {
                            console.log("Did we get the crash?");
                        });
                        setReload(!reload);
                    })
                    .catch(err => {
                        setInfo({loading: false, success: false});
                        console.log("PAYMENT FAILED");
                    })
            })
    }

    const brainTreeDrpoIn = () => (
        <div>
            <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
        </div>

    )

    useEffect(() => {
        getToken(userId, token);
    }, []);

    return (
        <div>
            {info.clientToken !== null && products !== undefined ? (
                <div>
                    <h3>Your Bill is {getAllPrice()} $</h3>
                    {brainTreeDrpoIn()}
                </div>
            ) : (<h3>Please Login or Add something to Cart</h3>)}
        </div>
    )
}

export default BrainTreePayment;
