import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategory, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";


const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {
        name,
        description,
        price,
        stock,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData
    } = values;

    const preload = (productId) => {
        getProduct(productId).then(data => {
            //console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    formData: new FormData(),
                });
                getaCategory();
            }
        });
    };


    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const getaCategory = () => {
        getAllCategory().then(data => {
            //console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ categories: data, formData: new FormData() });
            }
        });
    }

    const onUpdate = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData ).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name
                });

                //Redirect after two second
                setTimeout(() => {
                    setValues({ ...values, getaRedirect: true });
                }, 3000);
            }
        });
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdProduct ? null : "none" }}
        >
            <h4>{createdProduct} updated successfully</h4>
        </div>
    );

    const errorMessage = () => {
        return (
            <div className="alert alert-warning mt-3" style={{ display: error ? null : "none" }}>
                <h4>Oops! Couldn't update the product</h4>
            </div>
        )
    }

    const performRedirect = () => {
        if (getaRedirect) {
            return <Redirect to="/admin/dashboard" />
        }
    }

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onUpdate}
                className="btn btn-outline-success mb-3"
            >
                Update Product
      </button>
        </form>
    );

    return (
        <Base
            title="Update a product here!"
            description="Welcome to product Updation section"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
      </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                    {performRedirect()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
