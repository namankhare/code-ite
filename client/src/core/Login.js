import React, { useRef, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../backend";
import backArrow from "../assets/svg/backArrow.svg";
import poster from "../assets/svg/poster.svg";
import { Link, useNavigate } from "react-router-dom";
import { editorDetailsContext } from "../context/GlobalContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {


  const email = useRef("");
  const password = useRef("");

  const { setLoginState, setIsLoggedIn, isLoggedIn } = useContext(editorDetailsContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/');
    }
  }, [navigate, isLoggedIn]);

  const loginReq = () => {
    const sendEmail = email.current.value;
    const sendPassword = password.current.value;
    const loginResponse = toast.loading("Please wait...")
    axios
      .post(`${API}/auth/login`, {
        email: sendEmail,
        password: sendPassword,
      }, {
        withCredentials: true
      })
      .then(function (response) {
        toast.update(loginResponse, { render: "Login Successful! 😄", type: "success", isLoading: false, autoClose: 3500, theme: "dark", closeOnClick: true, draggable: true });
        setIsLoggedIn(true);
        setLoginState({ name: response.data.user.name, email: response.data.user.email, error: false });
        sessionStorage.setItem("jwt", response.data.token);
        sessionStorage.setItem('name', response.data.user.name)
        setTimeout(() => {
          navigate('/')
        }, 2000);
      })
      .catch(function (error) {
        console.log("error", error);
        toast.update(loginResponse, { render: "Login Failed! 😛", type: "error", isLoading: false, autoClose: 3500, theme: "dark", closeOnClick: true, draggable: true });
        setIsLoggedIn(false);
        setLoginState({ name: "", email: "", error: true });
      });
  };

  return (
    <div className="p-0 m-0">
      <nav
        className="d-flex justify-content-between"
        style={{ padding: "25px 50px" }}
      >
        <Link style={{ width: "50px" }} to="/">
          <img
            src={backArrow}
            alt="arrow"
            className="backArrow"
            style={{ width: "20px" }}
          />
        </Link>
        <h3>{"<Code-ite />"}</h3>
      </nav>
      <div className="container">
        <div className="container-fluid d-flex pt-4 mt-4">
          <div className="px- mx-5 pt-5" style={{ width: "60%" }}>
            <form className="LoginForm" style={{ paddingTop: "30px" }}>
              <h1 className=" fs-2">Login</h1>
              <div className="mb-3 ">
                <label htmlFor="InputEmail" className="no-textwrap py-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control mt-1 py-2 rounded-0  shadow bg-body rounded"
                  id="InputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  ref={email}
                />
              </div>
              <div className="mb-4 ">
                <label htmlFor="InputPassword" className="no-textwrap py-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control mt-1 py-2 rounded-0 shadow bg-body rounded"
                  id="InputPassword"
                  aria-describedby="passwordHelp"
                  placeholder="Password"
                  ref={password}
                />
              </div>

              <div className="rightSec justify-content-start">
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
            {/* <h3 className=" fs-6 text-center ">{login}</h3> */}
          </div>
          <div className="justify-content-center d-none d-md-block mx-5 px-5 pt-5">
            <img
              src={poster}
              alt="back"
              width="80%"
              height="100%"
              style={{ marginLeft: "20px" }}
            />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss="false" />
    </div>
  );
};

export default Login;
