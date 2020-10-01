import React from "react";
import Base from "./Base";
import { Link } from "react-router-dom";

const FailedPurchase = () => {
  return (
    <Base title="Purchase Failed!" description="Sorry, your payment is unsuccesful. Please try again later!"
      className="text-center"
    >
      <Link to="/" type="button" className="mx-2 btn btn-lg btn-info">Shop</Link>
      <Link to="/cart" type="button" className="mx-2 btn btn-lg btn-outline-dark">Cart</Link>
    </Base>
  )
}

export default FailedPurchase;
