import React, { useEffect, useRef, useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import { ClockLoader as Loader } from "react-spinners";
import "../assets/css/Toggle.css";
import { useParams } from "react-router-dom";
import { editorDetailsContext } from "../context/GlobalContext";

import { API } from "../backend";
import axios from 'axios';
import { io } from 'socket.io-client';

const IDE = () => {
    //
    const [ideCode] = useState("text");
    const editorRef = useRef("");
    const monacoRef = useRef("");
    const { room } = useParams();
    const langRef = useRef("")

    const { editorData, setEditorData } = useContext(editorDetailsContext);
    let isadmin = useRef(false);
    let isWorkingData = useRef(false)
    var users = {}  //user
    var contentWidgets = {} //save monaco editor name contentWidgets - 
    const workingData = useRef("")
    let issocket = useRef(false)

    function randomDisplayName() {
        return Math.round(Math.random() * 1000);
    }
    let socket;
    socket = io(API);
    useEffect(() => {
        let username = randomDisplayName()
        console.log(`Connecting socket...`, username);
        socket.emit("join-room", room, username);
        socket.on('admin', function (data) {    //admin Event  
            console.log("mai admin")
            isadmin.current = true
            console.log(isadmin.current)
        })
        //
        socket.on('userdata', function (data) {     //Connected Client Status Event
            console.log("userdata: ", data)
            if (data.length === 1)
                isadmin.current = true
            for (var i of data) {
                users[i.user] = i.color
                insertWidget(i)
            }
        })
        //

        socket.on('resetdata', function (data) {    //get Default Editor Value
            console.log("called");
            workingData.current = data;
            isWorkingData.current = true
        })



        return () => {
            if (socket) socket.disconnect();
        }

    }, [])

    //before editor mount
    function handleEditorWillMount(monaco) {
        // console.log(monaco.editor)
        monacoRef.current = monaco.editor

    }

    function handleEditorDidMount(editor) {
        editorRef.current = editor; //save ref for later use
        editor.onDidChangeModelContent(function (e) { //Text Change
            if (issocket.current === false) {
                socket.emit('key', e)
            } else {
                issocket.current = false
            }
        })
        socket.on('key', function (data) {  //Change Content Event
            issocket.current = true
            changeText(data, editor)
        })
        editor.onDidChangeCursorSelection(function (e) {    //Cursor or Selection Change
            socket.emit('selection', e)
        })

        socket.on('connected', function (data) { //Connect New Client Event
            console.log("connected: ", data)
            users[data.user] = data.color
            insertWidget(data)
            socket.emit("filedata", editor.getValue())

        })
        if (isWorkingData.current) {
            issocket.current = true
            editor.setValue(workingData.current);
            issocket.current = false
        }

        editor.focus();
    }
    function changeText(e, editor) {
        editor.getModel().applyEdits(e.changes) //change Content
    }

    function insertWidget(e) {
        contentWidgets[e.user] = {
            domNode: null,
            position: {
                lineNumber: 0,
                column: 0
            },
            getId: function () {
                return 'content.' + e.user
            },
            getDomNode: function () {
                if (!this.domNode) {
                    this.domNode = document.createElement('div')
                    this.domNode.innerHTML = e.user
                    this.domNode.style.background = e.color
                    this.domNode.style.color = 'black'
                    this.domNode.style.opacity = 1
                    this.domNode.style.width = 'max-content'
                }
                return this.domNode
            },
            getPosition: function () {
                console.log("thispositio", this.position)
                return {

                    position: this.position,
                    preference: [monacoRef.current.ContentWidgetPositionPreference.ABOVE, monacoRef.current.ContentWidgetPositionPreference.BELOW]
                }
            }
        }
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
                document.getElementById('outputCode').value = response3
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
                        className="btn btn-outline-dark px-3 py-1 text-nowrap  mx-1 rounded-0"
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
                    language="javascript"
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorDidMount}
                    defaultValue={ideCode}
                    loading={<Loader />}
                />
            </div>
        </>
    );
};

export default IDE;
