import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getSingleUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";


export default function PurchaseHistory() {

  const [purchase, setPurchase] = useState([]);

    const { user, token } = isAuthenticated();

    useEffect(() => {
        loadPurchase();
    }, []);

    const loadPurchase = () => {
      getSingleUser(user._id, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const { purchases } = data;
          setPurchase(purchases);
        }
      })
    }

    const myPurchaseList = () => {
        return (
            <div className="row">
                <div className="col">
                    <h3 className="pt-3 text-warning">Product Name</h3>
                    {purchase.map((item, index) => {
                      return (
                        <p
                        key={index}
                        className="lead"
                        >{item.name}</p>
                      )
                    })}
                </div>
                <div className="col">
                    <h3 className="pt-3 text-warning">Amount Paid</h3>
              {purchase.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="lead"
                  >{item.amount} $</p>
                )
              })}
                </div>
                <div className="col">
                    <h3 className="pt-3 text-warning">Transaction Id</h3>
              {purchase.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="lead"
                  >{item.transaction_id}</p>
                )
              })}
                </div>
            </div>
        );
    }

    return (
        <Base title="My Purchase History"
            description="Products and Payment"
            className="container text-white text-center bg-info"
        >
            {myPurchaseList()}
        </Base>
    )
}
