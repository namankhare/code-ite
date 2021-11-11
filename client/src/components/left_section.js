import React from 'react'
import { Link } from 'react-router-dom'

const Leftsec = () => {

    return (
        <div className="container">
            <div className="container-fluid" >
                <div className="position-absolute translate-middle-y" style={{ "top": "65%" }}>
                    <h1 className="lefthead">{"<Code-ite/>"}</h1>
                    <p className="description" > Create private rooms and code.<br />
                        White board also included so that you don't<br />
                        miss out on logics...<br />
                    </p>

                    <h4 className="wishes">Happy Coding :)</h4>


                    <div className="btn-wrapper">
                        <Link to="/join"><button type="submit" className="btn btn-dark  my-2 px-4 py-3" id="btnn"> Create Room</button></Link>
                        <button type="submit" className="btn btn-outline-dark mx-4 my-2 px-4 py-3" id="btnn" >  Join Room  </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Leftsec
