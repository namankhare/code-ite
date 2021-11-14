import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Leftsec = () => {
    const [joinForm, setJoinForm] = useState(false)
    const joinFormValue = useRef('default')

    const joinRoom = () => {
        window.location.href = `/room/${joinFormValue.current.value}`
    }
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


                    {joinForm ?
                        <div className="btn-wrapper">
                            <input type="text" className="form-control mx-4 my-1 px-4 py-2" id="floatingInputValue" placeholder="Enter room code" ref={joinFormValue} />
                            <button onClick={() => (joinRoom())} className="btn btn-dark mx-4 my-2 px-4 py-3" id="btnn" >Join Room</button>

                            <button onClick={() => (setJoinForm(!joinForm))} className="btn btn-outline-dark  my-2 px-4 py-3" id="btnn">{`< Back`}</button>
                        </div>
                        :
                        <div className="btn-wrapper">
                            <Link to="/join"> <button className="btn btn-dark  my-2 px-4 py-3" id="btnn"> Create Room</button></Link>
                            <button onClick={() => (setJoinForm(!joinForm))} className="btn btn-outline-dark mx-4 my-2 px-4 py-3" id="btnn" >Join Room</button>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default Leftsec
