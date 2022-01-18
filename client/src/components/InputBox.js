import React, { useContext, useRef } from 'react'
import { editorDetailsContext } from '../context/GlobalContext';
const Input = () => {

    const { setEditorData } = useContext(editorDetailsContext)
    const inputRef = useRef("")

    return (
        <div className="container-fluid" style={{ "border": "1x solid black", "width": "100%" }}>
            <div className="d-flex justify-content-between m-1 p-1 bg-light" >
                <h5 style={{ "fontWeight": "400", "fontSize": "16px" }}>Input</h5>

                <button
                    type="button"
                    className="btn btn-outline-dark px-3 py-1 text-nowrap rounded-0"
                    style={{ "border": "1px solid black", "fontSize": "10px", "boxShadow": "none" }}
                >
                    Clear
                </button>
            </div>
            <textarea name='args' onChange={() => { setEditorData({ args: inputRef.current.value }) }} rows="4" style={{ "width": "100%", "fontSize": "14px" }} cols="109" className="mt-2" ref={inputRef}>

            </textarea>
        </div >
    )
}

export default Input
