import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import '../assets/css/LeftHeroSection.css'

const LeftHeroSection = () => {
    const [joinForm, setJoinForm] = useState(false)
    const joinFormValue = useRef('default')
    let navigate = useNavigate();

    return (
        <div id="LeftHero" className="container d-flex align-items-center" style={{ height: "100vh" }}>
            <div className="container-fluid" >
                <div className="d-block" >
                    <h1 className="fw-bold mb-3" style={{ "fontSize": "3.4rem" }}>{"<Code-ite/>"}</h1>
                    <p className="fs-5 fw-light lh-sm mt-4" > Create private rooms and code.<br />
                        White board also included so that you don't<br />
                        miss out on logics...<br />
                    </p>

                    <h4 className="fs-4">Happy Coding 🙂</h4>


                    {joinForm ?
                        <div className="mt-5">
                            <input type="text" className="form-control  px-4 py-2 w-75" id="floatingInputValue" placeholder="Enter room code" ref={joinFormValue} />
                            <button onClick={() => (navigate(`/room/${joinFormValue.current.value}`))} className="btn btn-dark my-4 px-4 py-3 rounded-0"><i className="fas fa-sign-in-alt"></i> Enter Room</button>

                            <button onClick={() => (setJoinForm(!joinForm))} className="btn btn-outline-dark mx-4  px-4 py-3 rounded-0" >{`< Back`}</button>
                        </div>
                        :
                        <div className="mt-5">
                            <Link to="/join">

                                <button className="btn btn-dark px-3 py-3 rounded-0" > <i className="far fa-plus-square"></i> Create Room</button></Link>
                            <button onClick={() => (setJoinForm(!joinForm))} className="btn btn-outline-dark my-2 ms-3 justify-between  px-3 py-3 rounded-0"><i className="fas fa-sign-in-alt"></i> Join Room</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftHeroSection
