import React, {useState, useEffect} from "react";
import CardImage from "./helper/CardImage";
import { Redirect } from "react-router-dom";
import { addItemToCart } from "./helper/cartHelper";


const Card = ({product, addToCart = true, removeFromCart = false}) => {

    const [redirect, setRedirect] = useState(false);

    const cardTitle = product ? product.name : "Default Name";
    const cardDescription = product ? product.description : "Default Description";
    const cardPrice = product ? product.price : "0";

    const updateCart= () => {
        addItemToCart(product, () => setRedirect(true));
    }

    const performRedirect = () => {
        if(redirect) {
            return (
                <Redirect to="/cart" />
            );
        }
    }

    const showAddToCart = (setCondition) => {
        return(
            setCondition && (
                <button
                    onClick={updateCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    }

    const showRemoveFromCart = setCondition => {
        return(
            setCondition && (
                <button
                    onClick={() => { }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        );
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {performRedirect()}
                <div className="rounded border border-success p-2">
                    <CardImage product={product}/>
                </div>
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
          </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
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
