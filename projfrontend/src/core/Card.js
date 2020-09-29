import React, { useState, useEffect } from "react";
import CardImage from "./helper/CardImage";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";


const Card = ({
    product,
    addToCart = true,
    removeFromCart = false,
    reload,
    setReload
}) => {

    const [redirect, setRedirect] = useState(false);

    const cardTitle = product ? product.name : "Default Name";
    const cardDescription = product ? product.description : "Default Description";
    const cardPrice = product ? product.price : "0";

    const updateCart = () => {
        addItemToCart(product, () => setRedirect(true));
    }

    const performRedirect = () => {
        if (redirect) {
            return (
                <Redirect to="/cart" />
            );
        }
    }

    const showAddToCart = (setCondition) => {
        return (
            setCondition && (
                <button
                    onClick={updateCart}
                    className="btn btn-block btn-info mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    }

    const showRemoveFromCart = setCondition => {
        return (
            setCondition && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        );
    }

    return (
        <div className="card">
            <div className="card-header lead text-primary p-50"><b>{cardTitle}</b></div>
            <div className="card-body">
                {performRedirect()}
                <div className="rounded p-2">
                    <CardImage product={product} />
                </div>
                <p className="lead text-dark font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-info rounded  btn-sm px-4">$ {cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
