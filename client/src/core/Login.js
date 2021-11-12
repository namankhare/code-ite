import React, { useRef, useState } from "react";
import axios from "axios";
import { API } from "../backend";
import "../assets/css/Login.css";
import backArrow from "../assets/svg/backArrow.svg";
import poster from "../assets/svg/poster.svg";

const Login = () => {
  const email = useRef("");
  const password = useRef("");

  const [login, setLogin] = useState(""); // not login

  // const testdetails = () => {
  //     console.log(email.current.value)
  // }

  const loginReq = () => {
    const sendEmail = email.current.value;
    const sendPassword = password.current.value;

    axios
      .post(`${API}/login`, {
        email: sendEmail,
        password: sendPassword,
      })
      .then(function (response) {
        console.log(response);
        setLogin(response.data.data[0].name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <nav>
        <img src={backArrow} alt="arrow" className="backArrow" />
        <h3>{"<Code-ite />"}</h3>
      </nav>
      <div className="login-container">
        <div className="right">
          <form>
            <h1>Login</h1>
            <div className="form-group-1">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                ref={email}
              />
            </div>
            <div className="form-group-2">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                ref={password}
              />
            </div>
            <div className="btn-wrapper">
              <input
                type="button"
                onClick={() => {
                  loginReq();
                }}
                value="Login"
                className="btn btn-dark login-button"
              />
            </div>
            {/* <input type="button" onClick={() => { testdetails() }} /> */}
          </form>
          <h3 className="alert">Incorrect Credentials. Please try again</h3>
        </div>
        <div className="left">
          <img src={poster} alt="back" className="poster" />
        </div>
      </div>
    </div>
  );
};

export default Login;
