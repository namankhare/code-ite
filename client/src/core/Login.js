import React, { useRef, useState } from 'react'
import axios from 'axios';
import { API } from '../backend';


const Login = () => {
    const email = useRef("")
    const password = useRef("")

    const [login, setLogin] = useState('not loggedin')

    // const testdetails = () => {
    //     console.log(email.current.value)
    // }

    const loginReq = () => {
        const sendEmail = email.current.value
        const sendPassword = password.current.value

        axios.post(`${API}/login`, {
            email: sendEmail,
            password: sendPassword
        })
            .then(function (response) {
                console.log(response);
                setLogin(response.data.data[0].name)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div >
            <h1>{login}</h1>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={email} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref={password} />
                    </div>
                    <input type="button" onClick={() => { loginReq() }} value="Submit" className="btn btn-dark" style={{ "borderRadius": "0px" }} />
                    {/* <input type="button" onClick={() => { testdetails() }} /> */}

                </form>
            </div>
        </div>
    )
}

export default Login
