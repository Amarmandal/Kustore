import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoute path="/admin/create/category" component={AddCategory} />
                <AdminRoute path="/admin/categories" component={ManageCategories} />
                <AdminRoute path="/admin/create/product" component={AddProduct} />
                <AdminRoute path="/admin/products" component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" component={UpdateCategory} />
            </Switch>
        </Router>

    );
}
