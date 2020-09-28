import React from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";


export default function UserDashBoard() {

  const { user: { name, email } } = isAuthenticated();

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/order/history" className="nav-link text-info">Order History</Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/purchase/history" className="nav-link text-info">Purchase History</Link>
          </li>
        </ul>
      </div>
    )
  }

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <h4><span className="badge badge-success mr-2">Name: </span>{name}</h4>
          </li>
          <li className="list-group-item">
            <h4><span className="badge badge-success mr-2">Email: </span>{email}</h4>
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">User Area</span>
          </li>
        </ul>
      </div>
    )
  }



  return (
    <Base
      title="User DashBoard"
      description="Manage all your orders"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3 col-sm-5">
          {userLeftSide()}
        </div>
        <div className="col-md-9 col-sm-7">
          {userRightSide()}
        </div>
      </div>
    </Base>
  )
}
