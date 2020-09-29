import React from "react";
import Base from "./Base";
import { Link } from "react-router-dom";

const SuccessPurchase = () => {
  return (
    <Base title="Purchase Success!" description="Thanks Your Purchase is Succesful"
      className="text-center"
    >
      <Link to="/" type="button" className="mx-2 btn btn-lg btn-info">Shop More</Link>
      <Link to="/user/order/history" type="button" className="mx-2 btn btn-lg btn-outline-dark">View Orders</Link>
    </Base>
  )
}

export default SuccessPurchase;
