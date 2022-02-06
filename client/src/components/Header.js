import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CollaborationIcons from "./CollaborationIcons";
import { editorDetailsContext } from "../context/GlobalContext";

const Header = () => {
  const { darkMode } = useContext(editorDetailsContext);
  return (
    <>
      <div>
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light px-3 ${
            darkMode ? "navDark" : ""
          }`}
        >
          <div className="container-fluid px-4">
            <Link
              to="/"
              className={`navbar-brand  mx-3 my-1 h5 ${
                darkMode ? "textColor" : ""
              }`}
            >
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
              <span
                className={`navbar-toggler-icon ${
                  darkMode ? "navToggleIcon" : ""
                }`}
              ></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="#">
                  <li className="nav-item">
                    <span
                      className={`nav-link mx-3 my-1 h5 ${
                        darkMode ? "textColor" : ""
                      }`}
                    >
                      Support
                    </span>
                  </li>
                </Link>
                <Link to="/#about">
                  <li className="nav-item">
                    <span
                      className={`nav-link mx-3 my-1 h5 ${
                        darkMode ? "textColor" : ""
                      }`}
                    >
                      About
                    </span>
                  </li>
                </Link>
              </ul>
              {/* collab icons */}
              <CollaborationIcons />
              <form className="d-flex ">
                <Link to="/login" className="me-4 ">
                  <button
                    type="button"
                    className={`btn btn-outline-dark text-nowrap px-4 py-2 rounded-0 ${
                      darkMode ? "white-btn" : ""
                    }`}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    type="button"
                    className={`btn btn-dark text-nowrap px-4 py-2 rounded-0 ${
                      darkMode ? "black-btn" : ""
                    }`}
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
