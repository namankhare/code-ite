import React from 'react'
import "../assets/css/Signup.css";
import LoginPoster from "../assets/svg/Login-poster.svg";
import backArrow from "../assets/svg/backArrow.svg";

const Signup = () => {
    return (
        <div className="wrapper">
          <nav>
            <img src={backArrow} alt="arrow" className="backArrow" />
            <h3>{"<Code-ite />"}</h3>
          </nav>
          <div className="login-container container-fluid">
            <div className="left">
              <form className="LoginForm">
                <h1>Sign Up</h1>
                <div className="form-group-1">
                  <label htmlFor="exampleInputEmail1" >Enter Username</label>
                  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="form-group-2">
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
                <div className="form-group-2">
                  <label htmlFor="exampleInputPassword1">Create Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    // ref={password}
                  />
                </div>
                <div className="container m-3 ">
                  <input
                    type="button"
                    onClick={() => {
                    //   loginReq();
                    }}
                    value="Sign In"
                    className="btn btn-dark m-4 px-5 py-2 login-button"
                  />
                </div>
                {/* <input type="button" onClick={() => { testdetails() }} /> */}
              </form>
              {/* <h3 className="alert">{login}</h3> */}
            </div>
            <div className="right d-none d-md-none d-lg-block">
              <img src={LoginPoster} alt="back" className="poster" />
            </div>
          </div>
        </div>
      );
}

export default Signup
