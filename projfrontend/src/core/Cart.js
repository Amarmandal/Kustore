import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
// import StripeCheckout from "./helper/StripeCheckout";
import BrainTreePayment from "./BrainTreePayment";


export default function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                {products.map((product, index) => {
                    return (
                        <Card
                            key={index}
                            product={product}
                            addToCart={false}
                            removeFromCart={true}
                            reload={reload}
                            setReload={setReload}
                        />
                    );
                })}
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">
                    <h2>This section is to load the products</h2>
                    {products !== undefined ? loadAllProducts() : null}
                </div>
                <div className="col-6">
                    <BrainTreePayment
                        products={products}
                        setReload={setReload}
                    />
                </div>
            </div>
        </Base>
    );
}


