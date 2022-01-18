import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { API } from "../backend";
import "../assets/css/Login.css";
import backArrow from "../assets/svg/backArrow.svg";
import poster from "../assets/svg/poster.svg";
import { Link } from "react-router-dom";
import { loginState } from "../context/GlobalContext";



const Login = () => {
  const email = useRef("");
  const password = useRef("");

  const [login, setLogin] = useState(""); // not login

  const setCurrentLogin = useContext(loginState)

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
        setCurrentLogin(true);
        // console.log(currentLogin);
      })
      .catch(function (error) {
        console.log(error);

        setLogin("Invalid Username or Password.")
      });
  };

  return (
    <div className="p-0 m-0">
      <nav className="d-flex justify-content-between" style={{ "padding": "25px 50px" }}>
        <Link style={{ "width": "50px" }} to="/">
          <img src={backArrow} alt="arrow" className="backArrow" style={{ "width": "20px" }} />
        </Link>
        <h3>{"<Code-ite />"}</h3>
      </nav>
      <div className="container-fluid d-flex p-0 m-0">
        <div className="leftSec ">
          <form className="LoginForm" style={{ "paddingTop": "30px" }}>
            <h1 className=" fs-2">Login</h1>
            <div className="form-group-1" style={{ "padding": "25px 0 5px 0" }}>
              <label htmlFor="exampleInputEmail1" className="py-2"  >Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                ref={email}
              />
            </div>
            <div className="form-group-2" style={{ "padding": "5px 0 10px 0" }}>
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                ref={password}
              />
            </div>
            <div className="rightSec justify-content-start" >
              <input
                type="button"
                onClick={() => {
                  loginReq();
                }}
                value="Login"
                className="btn btn-dark m-4 ms-0 px-5 py-2 login-button"
                style={{ borderRadius: 0 }}
              />
            </div>
            {/* <input type="button" onClick={() => { testdetails() }} /> */}
          </form>
          <h3 className="alert">{login}</h3>
        </div>
        <div className="justify-content-center d-none d-md-block">
          <img src={poster} alt="back" width='80%' height='100%' style={{ marginLeft: '20px' }} />
        </div>
      </div >
    </div >
  );
};

export default Login;


