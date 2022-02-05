import React, { useEffect, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import { ClockLoader as Loader } from "react-spinners";
import "../assets/css/Toggle.css";
import { useParams } from "react-router-dom";
import { editorDetailsContext } from "../context/GlobalContext";

import { API } from "../backend";
import axios from "axios";
import ExampleCode from "../helper/ExampleCode";

const IDE = ({ socket }) => {
  //
  const editorRef = useRef("");
  const monacoRef = useRef("");
  const { room } = useParams();
  const langRef = useRef("");

  let isadmin = useRef(false);
  let isWorkingData = useRef(false);
  var users = {};
  var contentWidgets = {};
  const workingData = useRef("");
  let issocket = useRef(false);

  //Global Context
  const { editorData, setEditorData } = useContext(editorDetailsContext);
  const { setCollabIcons } = useContext(editorDetailsContext);

  function randomDisplayName() {
    return Math.round(Math.random() * 10000);
  }

  useEffect(() => {
    const username = () => {
      if (localStorage.getItem("language")) {
        langRef.current.value = localStorage.getItem("language");
      }
      if (!localStorage.getItem("Username")) {
        let newUsername = randomDisplayName();
        localStorage.setItem("Username", newUsername);
        return newUsername;
      } else {
        let fetchUsername = localStorage.getItem("Username");
        return fetchUsername;
      }
    };

    socket.on("connect", () => {
      console.log("connect!!");
      socket.emit("join-room", room, username());
    });
    socket.on("reconnect", () => {
      console.log("reconnect!!");
      socket.emit("join-room", room, username());
    });

    socket.on("admin", function (data) {
      //admin Event
      console.log("Admin initiated");
      isadmin.current = true;
    });
    //
    socket.on("userdata", function (data) {
      //Connected Client Status Event
      var filtered = data.filter(function ({ user }) {
        var key = `${user}`;
        return !this.has(key) && this.add(key);
      }, new Set());

      if (data.length === 1) isadmin.current = true;
      for (var i of data) {
        users[i.user] = i.color;
        insertWidget(i);
      }
      setCollabIcons(filtered);
    });
    //
    socket.on("outputcode", function (data) {
      //get Default Editor Value
      document.getElementById("outputCode").value = data;
    });
    //
    socket.on("resetdata", function (data) {
      //get Default Editor Value
      langRef.current.value = data[0].lang;
      workingData.current = data[0].code;
      isWorkingData.current = true;
    });
    return () => {
      if (socket) socket.disconnect();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //before editor mount
  function handleEditorWillMount(monaco) {
    monacoRef.current = monaco.editor;
  }

  function handleEditorDidMount(editor) {
    editorRef.current = editor; //save ref for later use
    editor.onDidChangeModelContent(function (e) {
      //Text Change
      if (issocket.current === false) {
        socket.emit("key", e);
      } else {
        issocket.current = false;
      }
    });

    socket.on("key", function (data) {
      //Change Content Event
      issocket.current = true;
      changeText(data, editor);
    });
    editor.onDidChangeCursorSelection(function (e) {
      //Cursor or Selection Change
      socket.emit("selection", e);
    });

    socket.on("connected", function (data) {
      //Connect New Client Event
      users[data.user] = data.color;
      insertWidget(data);
      let sendCurrentData = [
        {
          code: editor.getValue(),
          lang: langRef.current.value,
        },
      ];
      socket.emit("filedata", sendCurrentData);
    });

    if (isWorkingData.current) {
      issocket.current = true;
      editor.setValue(workingData.current);
      issocket.current = false;
    }

    // editor.focus();
  }
  function changeText(e, editor) {
    editor.getModel().applyEdits(e.changes); //change Content
  }

  function insertWidget(e) {
    contentWidgets[e.user] = {
      domNode: null,
      position: {
        lineNumber: 0,
        column: 0,
      },
      getId: function () {
        return "content." + e.user;
      },
      getDomNode: function () {
        if (!this.domNode) {
          this.domNode = document.createElement("div");
          this.domNode.innerHTML = e.user;
          this.domNode.style.background = e.color;
          this.domNode.style.color = "black";
          this.domNode.style.opacity = 1;
          this.domNode.style.width = "max-content";
        }
        return this.domNode;
      },
      getPosition: function () {
        console.log("thispositio", this.position);
        return {
          position: this.position,
          preference: [
            monacoRef.current.ContentWidgetPositionPreference.ABOVE,
            monacoRef.current.ContentWidgetPositionPreference.BELOW,
          ],
        };
      },
    };
  }

  const sendCode = () => {
    let encodedCode = btoa(editorRef.current.getValue());

    let encodedArgs = btoa(editorData.args);
    let encodedLang = btoa(langRef.current.value);

    const params = new URLSearchParams();
    params.append("code", encodedCode);
    params.append("args", encodedArgs);
    params.append("lang", encodedLang);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios
      .post(`${API}/code`, params, config)
      .then((response) => {
        var response3 = atob(response.data);
        socket.emit("outputcode", response3);
        document.getElementById("outputCode").value = response3;
      })
      .catch((err) => {
        socket.emit("outputcode", err);
      });
  };
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
                localStorage.setItem("language", langRef.current.value);
              }}
            >
              <option value="0">Language</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
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
            onClick={() => {
              sendCode();
            }}
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
          language={langRef.current.value}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          value={ExampleCode[langRef.current.value]}
          loading={<Loader />}
        />
      </div>
    </>
  );
};

export default IDE;
