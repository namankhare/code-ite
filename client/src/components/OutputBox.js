import React from 'react'
import ArrowDown from "../assets/svg/down-arrow.svg";

const Output = () => {
    return (
        <div className="container-fluid  " style={{ "border": "1x solid black", "height": "100%" }}>
            <div className="d-flex justify-content-between m-1 p-1 bg-light" >
                <h5 style={{ "fontWeight": "400", "fontSize": "16px" }}>Output</h5>
                <img src={ArrowDown} alt="" style={{ "width": "3%" }} />
            </div>
            <textarea rows="4" cols="70" className="mt-2" id="outputCode" style={{ "width": "100%", "fontSize": "14px" }} disabled>
            </textarea>
        </div>
    )
}

export default Output
