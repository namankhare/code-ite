import React from 'react'
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const Whiteboard = () => {

    const { editor, onReady } = useFabricJSEditor();
    const onAddCircle = () => {
        editor.addCircle();
    };
    const onAddRectangle = () => {
        editor.addRectangle();
    };

    return (
        <div className="container-fluid d-flex-column" style={{ "border": "3px solid black", "height": "750px", "width": "40%" }}>
            <div className="App">
                <h1>FabricJS React Sample</h1>
                <button onClick={onAddCircle}>Add circle</button>
                <button onClick={onAddRectangle}>Add Rectangle</button>
                <FabricJSCanvas className="sample-canvas" style={{ "height": "800px" }} onReady={onReady} />

            </div>
        </div>
    )
}

export default Whiteboard
