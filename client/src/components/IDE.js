import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react";
// import loader from "@monaco-editor/loader";
import { ClockLoader as Loader } from "react-spinners";
import { initiateSocketConnection, recieveSync, sendSync } from '../socketio.service';
import "../assets/css/Toggle.css";
//


// loader.init().then(monaco => {
//     monaco.editor.defineTheme('myTheme', {
//         base: 'vs',
//         inherit: true,
//         rules: [{ background: '1C2130' }],
//         colors: {
//             // 'editor.foreground': '#000000',
//             'editor.background': '#1C2130',
//             'editor.lineHighlightBackground': '#363C50',
//         }
//     });
//     monaco.editor.setTheme('myTheme');
// });

const IDE = () => {
    //


    //

    const [ideCode, setIdeCode] = useState("console.log('code-ite')")
    function handleEditorDidMount(editor) {
        editor.focus();
    }
    const onChange = (newValue, e) => {
        sendSync(newValue)
        setIdeCode(newValue)

    };

    useEffect(() => {
        initiateSocketConnection();
        recieveSync((err, data) => {
            setIdeCode(data)
        });
    }, []);

    return (
        <>
            <div className="container-fluid IDE mx-2 " style={{ "height": "750px", "width": "100%" }}>
                <div className="container d-flex justify-content-between m-1 p-1">
                    <div className=" d-flex" style={{ "paddingLeft": "0px" }}>
                        {/* <label className="form-check-label me-3 ps-0" htmlFor="flexSwitchCheckDefault">Language</label> */}

                        <select className="form-select" style={{ "width": "100%", "border": "1px solid black", "borderRadius": "0", "fontSize": "14px" }} aria-label="Default select example">
                            <option value="0">Language</option>
                            <option value="1">C++</option>
                            <option value="2">JavaScript</option>
                            <option value="3">Java</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-dark px-3 py-1 text-nowrap  mx-1"
                        id="btnn"
                        style={{ "border": "1px solid black", "fontSize": "14px", "boxShadow": "none" }}
                    >
                        Run
                    </button>

                    <label className="switch pt-2">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>

                </div>
                <Editor
                    height="90vh"

                    theme="vs"
                    language="javascript"
                    loading={<Loader />}
                    onChange={onChange}
                    value={ideCode}

                    onMount={handleEditorDidMount}
                />
            </div>
        </>
    )
}

export default IDE


