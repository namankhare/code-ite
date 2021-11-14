import React from 'react'
import IDE from '../components/IDE'
// import Output from '../components/Output'
import Whiteboard from '../components/Whiteboard'
import "../assets/css/Editor.css";


const Editor = () => {
    return (
        <div className="d-flex">
            <IDE />
            <Whiteboard />
            {/* <Output /> */}

        </div>
    )
}

export default Editor

