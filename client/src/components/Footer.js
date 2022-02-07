import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <div className="container-fluid">
        <div className="d-flex fs-2 justify-content-center border-top py-3">
          <p className="fs-5 mx-3">
            <a
              href="https://github.com/namankhare/code-ite"
              rel="noreferrer"
              target="_blank"
            >
              View this project on Github
            </a>
          </p>
          <i className="fa-brands fa-github github-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
