import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { sendOTP } from "./helper/userapicalls";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    otp: "",
    otpSent: false,
    status: false,
    success: false
  });

  const { name, email, password, error, otp, success, otpSent, status } = values;

  function handleChange(inputName) {
    return (event => {
      setValues({
        ...values, error: false, [inputName]: event.target.value
      })
    });
  }

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: data.error,
            success: false
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          })
        }
      })
      .catch(console.log("Error in signup"))
  }

  const handleSendOTP = (event) => {
    event.preventDefault();
    sendOTP({email}).then(data => {
      setValues({...values, otpSent: true})
      localStorage.setItem("otp", JSON.stringify(data.OTP));
    });
  }

  const handleVerifyOTP = (event) => {
    event.preventDefault();
    let myOtp = JSON.parse(localStorage.getItem("otp"));
    if(myOtp === otp) {
      console.log("OTP successfully verified");
      setValues({
        ...values,
        otpSent: false,
        status: true
      });
    } else {
      setValues({
        ...values,
        otpSent: true,
        status: false,
        error: "Invalid OTP Entered"
      });
      console.log(error);
    }
  }


  const successMessage = () => {
    return (
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success" style={{ display: success ? null : "none" }}>
          New account was created successfully. <Link to="/signin">Login Here</Link>
        </div>
      </div>
    );
  };

  const optSentSuccess = () => {
    return (
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success">
          Please Check you email for 6 digit verification code.
        </div>
      </div>
    );
  };


  const errorMessage = () => {
    return (
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{ display: error ? null : "none" }}>
          {error}
        </div>
      </div>
    );
  };

  const otpForm = () => {
    return (
      <div className="row mt-3">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark lead">Enter your six digit otp sent to mail.</label>
              <input className="form-control" onChange={handleChange("otp")} type="text" value={otp}/>
            </div>
            <div className="form-group">
              <button onClick={handleVerifyOTP} className="btn btn-warning btn-block">Verify OTP</button>
            </div>
            </form>
            </div>
      </div>
    );
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input className="form-control" onChange={handleChange("name")} type="text" value={name}
                disabled={status ? "disabled" : ""}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input className="form-control" onChange={handleChange("email")} type="email" value={email}
                disabled={status ? "disabled" : ""}
              />
            </div>
            {status ?
              <>
              <div className="form-group">
                <label className="text-dark">Password</label>
                <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
              </>
              : <button onClick={handleSendOTP} className="btn btn-success btn-block">Send OTP</button>}
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {otpSent ? optSentSuccess(): ""}
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {otpSent ? otpForm(): ""}
    </Base>
  );
};

export default Signup;
