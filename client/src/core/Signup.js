import React from 'react'
import "../assets/css/Login.css";
import LoginPoster from "../assets/svg/Login-poster.svg";
import backArrow from "../assets/svg/backArrow.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="p-0 m-0">
      <nav className="d-flex justify-content-between" style={{ "padding": "25px 50px" }}>
        <Link style={{ "width": "50px" }} to="/">
          <img src={backArrow} alt="arrow" className="backArrow" style={{ "width": "20px" }} />
        </Link>
        <h3>{"<Code-ite />"}</h3>
      </nav>
      <div className="container-fluid d-flex p-0 m-0">
        <div className="leftSec">
          <form className="LoginForm">
            <h1>Sign Up</h1>
            <div className="form-group-1" style={{ "padding": "25px 0 5px 0" }}>
              <label htmlFor="exampleInputEmail1" >Enter Username</label>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="form-group-2" style={{ "padding": "5px 0 10px 0" }}>
              <label htmlFor="exampleInputEmail1" >Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              // ref={email}
              />
            </div>
            <div className="form-group-2" style={{ "padding": "5px 0 10px 0" }}>
              <label htmlFor="exampleInputPassword1">Create Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              // ref={password}
              />
            </div>
            <div >
              <input
                type="button"
                onClick={() => {
                  //   loginReq();
                }}
                value="Sign In"
                className="btn btn-dark m-4 ms-0 px-5 py-2 login-button"
                style={{ borderRadius: 0 }}
              />
            </div>
            {/* <input type="button" onClick={() => { testdetails() }} /> */}
          </form>
          {/* <h3 className="alert">{login}</h3> */}
        </div>
        <div className="justify-content-center d-none d-md-none d-lg-block">
          <img src={LoginPoster} alt="back" width='80%' height="100%" style={{ marginLeft: '20px' }} />
        </div>
      </div>
    </div>
  );
}

export default Signup
