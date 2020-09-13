import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import { getUserOrder } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";


export default function OrderHistory() {
  const [order, setOrder] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getOrder();
  }, []);


  const getOrder = () => {
    getUserOrder(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
    });
  }

  const myOrder = () => {
    return(
      <div className="row">
        <div className="col col-md-6">
          <h3 className="pt-3">Order History</h3>
          {order.map((data, index) => {
            return(<p className="lead" key={index}>{data._id}</p>)
          })}
        </div>
        <div className="col col-md-6">
          <h3 className="pt-3">Order Status</h3>
          {order.map((data, index) => {
            return (
              <p
                key={index}
                className={data.status == "Recieved" ? "p-2 d-block badge badge-danger" : "p-2 d-block badge badge-warning"}
              >{data.status}</p>)
          })}
        </div>
      </div>
    );
  }

  return (
    <Base title="All of the order history here"
      className="container text-white text-center bg-info"
    >
    {myOrder()}
    </Base>
  )
}
