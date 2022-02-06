import React, { useContext } from "react";
import ArrowDown from "../assets/svg/down-arrow.svg";
import { editorDetailsContext } from "../context/GlobalContext";

const Output = () => {
  const { darkMode } = useContext(editorDetailsContext);
  return (
    <div
      className={`container-fluid ${darkMode ? "PrimaryDark" : ""}`}
      style={{ border: "1x solid black", height: "100%" }}
    >
      <div
        className={`d-flex justify-content-between m-1 p-1 bg-light ${
          darkMode ? "PrimaryDark" : ""
        }`}
      >
        <h5
          className={`${darkMode ? "textColor" : ""}`}
          style={{ fontWeight: "400", fontSize: "16px" }}
        >
          Output
        </h5>
        <img
          src={ArrowDown}
          alt=""
          style={{ width: "3%" }}
          className={`${darkMode ? "textColor" : ""}`}
        />
      </div>
      <textarea
        rows="4"
        cols="70"
        className={`mt-2 ${darkMode ? "SecondaryDark textColor" : ""}`}
        id="outputCode"
        style={{ width: "100%", fontSize: "14px" }}
        disabled
      ></textarea>
    </div>
  );
};

export default Output;
