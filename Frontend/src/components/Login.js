import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.email === "" || info.password === "") {
      return alert("All the fields are mandatory");
    }
  };

  const handleEmail = (event) => {
    setInfo({
      ...info,
      email: event.target.value,
    });
  };
  const handlePassword = (event) => {
    setInfo({
      ...info,
      password: event.target.value,
    });
  };

  return (
    <div className="form_design">
      <p className="fontWeight">
        <b>Log In</b>
      </p>
      <form
        className="child_design"
        method="POST"
        action="#"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label for="email" className="child_design">
          Email
        </label>
        <br />
        <input
          name="email"
          className="child_design"
          type="email"
          placeholder="Enter your Email"
          value={info.email}
          onChange={handleEmail}
        />
        <br />
        <label for="password" className="child_design">
          Password
        </label>
        <br />
        <input
          name="password"
          type="password"
          placeholder="Enter your Password"
          value={info.password}
          onChange={handlePassword}
        />

        <br />

        <button className="child_design btn-design">Login</button>

        <br />
        <br />
      </form>
      <small>
        Not a member? <Link to="/register">Sign Up</Link>
      </small>
      <br />
      <br />
    </div>
  );
}
