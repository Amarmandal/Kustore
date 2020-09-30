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
import Cart from './core/Cart';
import SuccessPurchase from './core/SuccessPurchase';
import FailedPurchase from './core/FailedPurchase';
import OrderHistory from './user/OrderHistory';
import PurchaseHistory from './user/PurchaseHistory';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/cart" component={Cart} />
                <PrivateRoute path="/success/purchase" component={SuccessPurchase} />
                <PrivateRoute path="/failed/purchase" component={FailedPurchase} />
                <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
                <PrivateRoute path="/user/order/history" component={OrderHistory} />
                <PrivateRoute path="/user/purchase/history" component={PurchaseHistory} />
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
