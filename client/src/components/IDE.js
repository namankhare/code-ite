import React, { useEffect, useRef, useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import { ClockLoader as Loader } from "react-spinners";
import "../assets/css/Toggle.css";
import { useParams } from "react-router-dom";
import MonacoConvergenceAdapter from "../adapters/MonacoAdapter";
import { editorDetailsContext } from "../hooks/GlobalState";
import { API } from "../backend";
import axios from 'axios';
import { initiateConvergenceConnection } from "../convergence.service";

const IDE = () => {
    //
    const [ideCode, setIdeCode] = useState("default-value");
    const editorRef = useRef("");
    const { room } = useParams();
    const langRef = useRef("")
    const codeRef = useRef("")

    // UseContext
    const { editorData, setEditorData } = useContext(editorDetailsContext);
    // const setEditorData = useContext(editorDetailsContext)
    // console.log(editorData)

    // const CONVERGENCE_URL =
    //     "ws://localhost:8000/api/realtime/convergence/default";

    function randomDisplayName() {
        return Math.round(Math.random() * 1000);
    }
    const oldText = useRef("");
    const username = randomDisplayName()

    useEffect(() => {
        const connectionModel = initiateConvergenceConnection(room, username)
        connectionModel.then((model) => {
            const adapter = new MonacoConvergenceAdapter(
                editorRef.current,
                model.elementAt("text")
            );
            oldText.current = model.elementAt("text").value();
            setIdeCode(oldText.current);
            adapter.bind();
        })
            .catch((error) => {
                console.error("Could not open model ", error);
            });
    }, [ideCode, room, username]);

    function handleEditorDidMount(editor) {
        console.log("after mounted: ", oldText.current);
        editorRef.current = editor;

        editor.focus();
    }
    const onChange = (newValue, e) => {
        // setEditorData({ code: newValue });
    };

    //before editor mount
    function handleEditorWillMount(monaco) {
        setIdeCode(oldText.current);
        console.log("before mounted: ", oldText.current);
    }

    const sendCode = () => {
        console.log(langRef.current.value)
        let encodedCode = window.btoa(unescape(encodeURIComponent(editorData.code)))
        let encodedArgs = window.btoa(unescape(encodeURIComponent(editorData.args)))
        let encodedLang = window.btoa(unescape(encodeURIComponent(langRef.current.value)))

        const params = new URLSearchParams()
        params.append('code', encodedCode)
        params.append('args', encodedArgs)
        params.append('lang', encodedLang)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios
            .post(`${API}/code`, params, config)
            .then((response) => {

                var response3 = decodeURIComponent(escape(window.atob(response.data)))
                document.getElementById('output').value = response3
                console.log(response3);
            }).catch((err) => {
                console.log(err);
            })

    }
    return (
        <>
            <div
                className="container-fluid IDE mx-2 "
                style={{ height: "80vh", width: "100%" }}
            >
                <div className="container d-flex justify-content-between m-1 p-1">
                    <div className=" d-flex" style={{ paddingLeft: "0px" }}>
                        {/* <label className="form-check-label me-3 ps-0" htmlFor="flexSwitchCheckDefault">Language</label> */}

                        <select
                            className="form-select"
                            style={{
                                width: "100%",
                                border: "1px solid black",
                                borderRadius: "0",
                                fontSize: "14px",
                            }}
                            aria-label="Default select example"
                            name="lang"
                            ref={langRef}
                            onChange={() => {
                                setEditorData({ lang: langRef.current.value });
                            }}
                        >
                            <option value="0">Language</option>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="js">JavaScript</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-dark px-3 py-1 text-nowrap  mx-1"
                        id="btnn"
                        style={{
                            border: "1px solid black",
                            fontSize: "14px",
                            boxShadow: "none",
                        }}
                        onClick={() => { sendCode() }}
                    >
                        Run
                    </button>

                    <label className="switch pt-2">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                {/*  */}

                <Editor
                    height="90vh"
                    theme="vs"
                    language="c"
                    loading={<Loader />}
                    onChange={onChange}
                    defaultValue={ideCode}
                    // onValidate={onChange}
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorDidMount}
                />
            </div>
        </>
    );
};

export default IDE;
