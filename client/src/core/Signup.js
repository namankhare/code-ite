import React, { useRef } from 'react'
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
      <div className="container">
        <div className="container-fluid d-flex p-0 m-0" >
          <div className=" mx-5 pt-5"style={{ "width": "70%" }} >
            <form className="LoginForm">
              <h1>Sign Up</h1>
              <div className="form-group-1  mb-3 mt-3" >
                <label htmlFor="InputName" >Enter Name</label>
                <input type="text" className="form-control mt-2 py-2 rounded-0  shadow bg-body rounded" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" ref={nameRef} />
              </div>
              <div className="form-group-1 mb-3" >
                <label htmlFor="InputUsername" >Enter Username</label>
                <input type="text" className="form-control mt-2 py-2 rounded-0  shadow bg-body rounded" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" ref={usernameRef} />
              </div>
              <div className="form-group-2 mb-3">
                <label htmlFor="InputEmail" >Email address</label>
                <input
                  type="email"
                  className="form-control mt-2 py-2 rounded-0  shadow bg-body rounded"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  ref={emailidRef}

                />
              </div>
              <div className="form-group-2 mb-3" >
                <label htmlFor="InputPassword">Create Password</label>
                <input
                  type="password"
                  className="form-control mt-2 py-2 rounded-0  shadow bg-body rounded"
                  id="InputPassword"
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
              
            </form>
          </div>
          
        
        <div className="d-none d-md-block ms-5">
          <img src={LoginPoster} alt="" width='90%' height="100%" style={{ marginLeft: '60px' }} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup
