import React from 'react'

const Leftsec = () => {
    const btnn={
        borderRadius:0,
    }

    const leftstyle={
        margin: "170px 20px",
        width: "50%",
        padding:"10px 10px",
    };

    const leftpara={
        fontSize: 20,
        margin: "10px 5px",
        padding: "5px ",
       
    }
    const button={
        margin:""
    }

    const lefthead={
        fontSize: 70,
    }
    return (
        <div className=" container" style={leftstyle}>
            <h1 style={lefthead}>{"</Code-ite>"}</h1>
            <p className="leftpara" style ={leftpara}> Create private rooms and code.<br/>
                White board also included so that you don't<br/>
                miss out on logics...<br/>
            </p>

            <h4 style={leftpara}>Happy Coding :)</h4>

            <div className="container-fluid">
                <button type="submit"  className="btn btn-dark  my-2 px-4 py-3" style={btnn}> Create Room</button>
                <button type="submit" className="btn btn-outline-dark mx-4 my-2 px-4 py-3" style={btnn} >  Join Room  </button>
            </div>
            
        </div>
    )
}

export default Leftsec
