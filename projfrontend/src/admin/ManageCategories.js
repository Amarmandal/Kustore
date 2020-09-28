import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategory, deleteCategory } from "./helper/adminapicall";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";


export default function ManageCategories() {
    const [values, setValues] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getAllCategory().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues(data);
            }
        });
    }

    useEffect(() => {
        preload();
    }, []);

    const onDelete = (categoryId) => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <Base
            className="container text-dark"
            title="Manage Category"
            description="You can update and delete categories here"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-info rounded">Admin Home</Link>
            <h3 className="text-center py-4">Total {values.length} Category</h3>
            {values.map((category, index) => {
                return (
                    <div key={index} className="row mt-4">
                        <h4 className="col-md-4">{category.name}</h4>
                        <div className="col-md-4">
                            <Link to={`/admin/category/update/${category._id}`} className="btn btn-md btn-success rounded">
                            Update
                            </Link>
                        </div>
                        <div className="col-md-4"><button onClick={() => { onDelete(category._id) }} className="btn btn-md btn-danger rounded">Delete</button></div>
                    </div>
                );
            })}

        </Base>
    )
}
