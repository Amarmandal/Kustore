import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import BrainTreePayment from "./BrainTreePayment";
import LocalPayment from "./LocalPayment";

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
      <div className="row text-center text-dark">
        <div className="col-lg-4 col-md-8 col-sm-12">
          {(products === undefined || products.length === 0) ? <h2>Please add something to cart</h2> : <h2>Products in the cart</h2>}
          {products !== undefined ? loadAllProducts() : null}
        </div>
        <div className="col-lg-7 ml-auto">
          <BrainTreePayment
            products={products}
            setReload={setReload}
          />
          <LocalPayment
            products={products}
          />
        </div>
      </div>
    </Base>
  );
}


