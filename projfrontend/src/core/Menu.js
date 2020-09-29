import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";



const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#3797DB" }
    } else {
        return { color: "#292b2c" }
    }
}


const Menu = (prop) => (
    <div className = 'sticky-top'>
        <ul className="nav nav-tabs bg">
            <li className="nav-item">
                <Link style={currentTab(prop.history, "/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(prop.history, "/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link style={currentTab(prop.history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
                        User Dashboard
                </Link>
                </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style={currentTab(prop.history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                        Admin Dashboard
                </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(prop.history, "/signup")} className="nav-link" to="/signup">
                            Sign Up
                </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(prop.history, "/signin")} className="nav-link" to="/signin">
                            Sign in
                </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-dark" onClick={() => {
                        signout(() => {
                            prop.history.push("/");
                        });
                    }}>
                        Sign Out
                    </span>
                </li>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);
