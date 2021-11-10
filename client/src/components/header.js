import React from 'react'
import {Link} from "react-router-dom";
const headers = () => {
  const btnn={
    borderRadius:0,
  }

    return (
        <>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-2 my-1 px-2 py-2">
  <div className="container-fluid">
    <Link className="navbar-brand mb-0 h1 " to="#">{"</>"}</Link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active mx-5 my-1 h5" aria-current="page" to="#">Support</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active mx-6 my-1 h5" to="#">About</Link>
        </li>
        </ul>
        </div>
    
     
    <div className="  navbar- " id="navbarSupportedContent">
    <button type="button" class="btn btn-outline-dark text-nowrap px-4 py-2 mx-4 "style={btnn}>Login</button>
     
      <button type="button" class="btn btn-dark px-4 py-2 text-nowrap mx-1" style={btnn}>Sign Up</button>
    </div>
  </div>
</nav>
            
        </div>
        </>
    )
}

export default headers
