import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react";
import loader from "@monaco-editor/loader";
import { ClockLoader as Loader } from "react-spinners";
import io from "socket.io-client";
const socket = io.connect('/');

loader.init().then(monaco => {
    monaco.editor.defineTheme('myTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '1C2130' }],
        colors: {
            // 'editor.foreground': '#000000',
            'editor.background': '#1C2130',
            'editor.lineHighlightBackground': '#363C50',
        }
    });
    monaco.editor.setTheme('myTheme');
});

const IDE = () => {
    const [ideCode, setIdeCode] = useState("ini")
    function handleEditorDidMount(editor) {
        editor.focus();
    }
    const onChange = (newValue, e) => {
        socket.send(newValue)
        setIdeCode(newValue)

    };

    useEffect(() => {
        socket.on("createMessage", (data) => {
            setIdeCode(data)
            console.log(data)
        });
    }, []);

    return (
        <>
            <div className="container-fluid IDE" style={{ "border": "3px solid black", "height": "750px", "width": "60%", "backgroundColor": "#1C2130" }}>
                Yeh hai IDE
                <Editor
                    height="90vh"

                    theme="myTheme"
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
