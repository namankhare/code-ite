import React, { useRef } from 'react'
import "../assets/css/Login.css";
import LoginPoster from "../assets/svg/Login-poster.svg";
import backArrow from "../assets/svg/backArrow.svg";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API } from "../backend";


const Signup = () => {

  const usernameRef = useRef("")
  const emailidRef = useRef("")
  const passwordRef = useRef("")
  const nameRef = useRef("")


  const signupUser = () => {
    const sendUsername = usernameRef.current.value
    const sendEmailid = emailidRef.current.value
    const sendPassword = passwordRef.current.value
    const sendName = nameRef.current.value

    axios
      .post(`${API}/signup`, {
        email: sendEmailid,
        password: sendPassword,
        username: sendUsername,
        name: sendName
      })
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });

  }





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
            <div className="form-group-1 pb-0" style={{ "padding": "25px 0 5px 0" }}>
              <label htmlFor="exampleInputEmail1" >Enter Name</label>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" ref={nameRef} />
            </div>
            <div className="form-group-1 pt-2" >
              <label htmlFor="exampleInputEmail1" >Enter Username</label>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" ref={usernameRef} />
            </div>
            <div className="form-group-2" style={{ "padding": "5px 0 10px 0" }}>
              <label htmlFor="exampleInputEmail1" >Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                ref={emailidRef}

              />
            </div>
            <div className="form-group-2" style={{ "padding": "5px 0 10px 0" }}>
              <label htmlFor="exampleInputPassword1">Create Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                ref={passwordRef}

              />
            </div>
            <div >
              <input
                type="button"
                onClick={() => {
                  signupUser()
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
        <div className="justify-content-center d-none d-md-block">
          <img src={LoginPoster} alt="back" width='80%' height="100%" style={{ marginLeft: '20px' }} />
        </div>
      </div>
    </div>
  );
}

export default Signup
