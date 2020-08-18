import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";


export default function AdminDashBoard() {

	const {user: {name, email, role}} = isAuthenticated();

	const adminLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">Admin Navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/admin/create/category" className="nav-link text-info">Create Categories</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/categories" className="nav-link text-info">Manage Categories</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/create/product" className="nav-link text-info">Create Products</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/products" className="nav-link text-info">Manage Products</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/orders" className="nav-link text-info">Manage Orders</Link>
					</li>
				</ul>
			</div>
		)
	}

	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<h4><span className="badge badge-success mr-2">Name: </span>{name}</h4>
					</li>
					<li className="list-group-item">
						<h4><span className="badge badge-success mr-2">Email: </span>{email}</h4>
					</li>
					<li className="list-group-item">
						<span className="badge badge-danger mr-2">Admin Area</span>
					</li>
				</ul>
			</div>
		)
	}



	return (
		<Base
			title="Welcome to Admin Area"
			description="Manage all of your products and orders here!"
			className="container bg-success p-4"
		>
			<div className="row">
				<div className="col-3">
					{adminLeftSide()}
				</div>
				<div className="col-9">
					{adminRightSide()}
				</div>
			</div>
		</Base>
	)
}
