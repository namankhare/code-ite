import React, { useRef, useState } from "react";
import axios from "axios";
import { API } from "../backend";
import "../assets/css/Login.css";
import backArrow from "../assets/svg/backArrow.svg";
import poster from "../assets/svg/poster.svg";
import { Link } from "react-router-dom";


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
        setLogin("Invalid Username or Password.")
      });
  };

  return (
    <div className="wrapper">
      <nav>
        <Link style={{ "width": "50px" }} to="/">
          <img src={backArrow} alt="arrow" className="backArrow" />
        </Link>

        <h3>{"<Code-ite />"}</h3>
      </nav>
      <div className="login-container container-fluid">
        <div className="left">
          <form className="LoginForm">
            <h1>Login</h1>
            <div className="form-group-1">
              <label htmlFor="exampleInputEmail1" >Email address</label>
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
            <div className="container m-3 ">
              <input
                type="button"
                onClick={() => {
                  loginReq();
                }}
                value="Login"
                className="btn btn-dark m-4 px-5 py-2 login-button"
              />
            </div>
            {/* <input type="button" onClick={() => { testdetails() }} /> */}
          </form>
          <h3 className="alert">{login}</h3>
        </div>
        <div className="right d-none d-md-none d-lg-block">
          <img src={poster} alt="back" className="poster" />
        </div>
      </div>
    </div>
  );
};

export default Login;


