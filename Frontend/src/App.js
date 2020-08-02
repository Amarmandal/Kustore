import React from "react";
import "./App.css";
import Homepage from "./Pages/homepage";
import Navbars from "./components/Navbar";
import Contactus from "./Pages/contactUs";
import aboutUs from "./Pages/aboutUs";
import Login from "./components/Login";
import Registration from "./components/Register";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbars />

        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/about-us" exact component={aboutUs}></Route>
          <Route path="/contact" exact component={Contactus}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Registration}></Route>
        </Switch>

        <br />
        <br />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
