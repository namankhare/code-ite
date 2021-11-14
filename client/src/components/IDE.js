import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react";
// import loader from "@monaco-editor/loader";
import { ClockLoader as Loader } from "react-spinners";
import { disconnectSocket, initiateSocketConnection, recieveSync, sendSync, subscribeToChat } from '../socketio.service';



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


    const [ideCode, setIdeCode] = useState("ini")
    function handleEditorDidMount(editor) {
        editor.focus();
    }
    const onChange = (newValue, e) => {
        sendSync(newValue)
        setIdeCode(newValue)

    };

    useEffect(() => {

        initiateSocketConnection();
        subscribeToChat((err, data) => {
            console.log(data);
        });
        recieveSync((err, data) => {
            setIdeCode(data)
        });
        return () => {
            disconnectSocket();
        }
        // socket.on("createMessage", (data) => {
        //     setIdeCode(data)
        //     console.log(data)
        // });
    }, []);

    return (
        <>
            <div className="container-fluid IDE mx-2 " style={{ "height": "750px", "width": "60%" }}>
                <div className="container d-flex justify-content-between my-2">
                    <div className=" d-flex justify-content-start">
                        <label className="form-check-label me-3" htmlFor="flexSwitchCheckDefault">Language</label>

                        <select className="form-select" style={{ "width": "30%", }} aria-label="Default select example">
                            <option value="0">Language</option>
                            <option value="1">C++</option>
                            <option value="2">JavaScript</option>
                            <option value="3">Java</option>

                        </select>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-secondary text-dark px-3 py-1 text-nowrap  mx-1"
                        id="btnn"
                        style={{ "border": "1px solid black" }}
                    >
                        Run
                    </button>

                    <div className="form-check form-switch mt-2">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />

                    </div>



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
