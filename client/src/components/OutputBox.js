import React from 'react'
import ArrowDown from "../assets/svg/down-arrow.svg";

const Output = () => {
    return (
        <div className="container-fluid  navDark" style={{ "border": "1x solid black", "height": "100%" }}>
            <div className="d-flex justify-content-between m-1 p-1 bg-light navDark" >
                <h5 className='textColor' style={{ "fontWeight": "400", "fontSize": "16px" }}>Output</h5>
                <img src={ArrowDown} alt="" style={{ "width": "3%" }} className='textColor'/>
            </div>
            <textarea rows="4" cols="70" className="mt-2 navDark textColor" id="outputCode" style={{ "width": "100%", "fontSize": "14px" }} disabled>
            </textarea>
        </div>
    )
}

export default Output
