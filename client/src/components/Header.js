import React from "react";
import { Link } from "react-router-dom";

// const currentTab = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: "var(--text-color)", fontWeight: "bold" }
//   } else {
//     return { color: "var(--text-color)" }
//   }
// }

const Header = () => {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid px-4">
            <Link to="/" className="navbar-brand  mx-5 my-1 h5">
              {"</>"}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <Link to="#">
                  <li className="nav-item">
                    <span className="nav-link active mx-3 my-1 h5">
                      Support
                    </span>
                  </li>
                </Link>
                <Link to="#">
                  <li className="nav-item">
                    <span className="nav-link mx-3 my-1 h5">About</span>
                  </li>
                </Link>
              </ul>
              <form className="d-flex">
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-outline-dark text-nowrap px-4 py-2 mx-4  "
                    id="btnn"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    type="button"
                    className="btn btn-dark px-4 py-2 text-nowrap mx-1"
                    id="btnn"
                  >
                    Sign Up
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
