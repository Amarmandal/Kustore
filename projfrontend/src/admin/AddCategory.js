import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";


export default function AddCategory() {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
    </div>
  )

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  }

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    })
  }

  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="text-warning mt-4">Failed to Create Category</h4>
      )
    }
  }

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success mt-4">Category successfully created</h4>
      )
    }
  }

  const myCategoryForm = () => {

    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex.Summer"
          />
        </div>
        <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
      </form>
    )

  }


  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  )
}
