import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { API } from "../backend";
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
      <div className="container">
      <div className="container-fluid d-flex pt-4 mt-4" >
        <div className="px- mx-5 pt-5" style={{ "width": "60%" }}>
          <form className="LoginForm" style={{ "paddingTop": "30px" }}>
            <h1 className=" fs-2">Login</h1>
            <div className="mb-3 " >
              <label htmlFor="InputEmail" className="no-textwrap py-2"  >Email address</label>
              <input
                type="email"
                className="form-control mt-1 py-2 rounded-0  shadow bg-body rounded"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                ref={email}
              />
            </div>
            <div className="mb-4 " >
              <label htmlFor="InputPassword" className="no-textwrap py-2"  >Password</label>
              <input
                type="password"
                className="form-control mt-1 py-2 rounded-0 shadow bg-body rounded"
                id="InputPassword"
                aria-describedby="passwordHelp"
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
                className=" btn btn-dark m-4 ms-0 px-5 py-2 "
                style={{ borderRadius: 0 }}
              />
            </div>
          </form>
          <h3 className=" fs-6 text-center ">{login}</h3>
        </div>
        <div className="justify-content-center d-none d-md-block mx-5 px-5 pt-5">
          <img src={poster} alt="back" width='80%' height='100%' style={{ marginLeft: '20px' }} />
        </div>
      </div >
    </div >
    </div>
  );
};

export default Login;


