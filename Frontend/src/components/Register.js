import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Registration() {
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.email === "" || info.password === "" || info.fullName === "") {
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

  const handleFullName = (event) => {
    setInfo({
      ...info,
      fullName: event.target.value,
    });
  };

  return (
    <div className="form_design1">
      <p className="fontWeight">
        <b>Sign Up</b>
      </p>

      <form
        className="child_design"
        method="POST"
        action="/register"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label for="name" className="child_design">
          Full Name
        </label>
        <br />
        <input
          name="name"
          className="child_design"
          type="text"
          placeholder="Enter your Full Name"
          value={info.fullName}
          onChange={handleFullName}
        />
        <br />
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
        <button className="child_design btn-design">Sign Up</button>
        <br />
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
      <br />
      <br />
    </div>
  );
}
