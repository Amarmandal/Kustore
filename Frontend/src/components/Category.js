import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "../App.css";

function Category({ picture, title }) {
  return (
    <div className="responsive">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top image1"
          src={picture}
          alt="Furnitures here"
          style={{ height: "12rem" }}
        />
        <div className="card-body">
          <h5 className="card-title color1">
            <b>{title}</b>
          </h5>
          <p className="card-text color2">
            Get more details. click the button.
          </p>
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
}
export default Category;
