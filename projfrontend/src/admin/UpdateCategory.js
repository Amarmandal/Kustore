import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import { updateCategory , getCategory } from "./helper/adminapicall";
import { useEffect } from "react";


export default function UpdateCategory({match}) {

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
        // console.log(event.target.value);
        setError("");
        setName(event.target.value);
    }

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setName(data.name);
            }
        });
    }

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onUpdate = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        updateCategory(match.params.categoryId, user._id, token, { name }).then(data => {
            // console.log();
            if (data.error) {
                setError(true);
            } else {
                console.log(data.name);
                setError(false);
                setSuccess(true);
                setName("");
            }
        })
    }

    const errorMessage = () => {
        if (error) {
            return (
                <h4 className="text-warning mt-4">Failed to Update Category</h4>
            )
        }
    }

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success mt-4">Category updated Successfully</h4>
            )
        }
    }

    const myCategoryForm = () => {

        return (
            <form>
                <div className="form-group">
                    <p className="lead">Update the category</p>
                    <input type="text"
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        placeholder="For Ex.Summer"
                    />
                </div>
                <button onClick={onUpdate} className="btn btn-outline-info">Update Category</button>
            </form>
        )

    }


    return (
        <Base
            title="Update a category here"
            description="Update category for old tshirts"
            className="container bg-info p-4"
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
