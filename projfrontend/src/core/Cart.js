import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";


export default function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load the products</h2>
                {products.map((product, index) => {
                    return(
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

    const loadCheckout = () => {
        return(
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    );
}


