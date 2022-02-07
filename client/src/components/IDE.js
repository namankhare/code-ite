import React, { useEffect, useRef, useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import { ClockLoader as Loader } from "react-spinners";
import "../assets/css/Toggle.css";
import { useParams } from "react-router-dom";
import { editorDetailsContext } from "../context/GlobalContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const { darkMode, setDarkMode } = useContext(editorDetailsContext);
  const { darkToggleRef } = useContext(editorDetailsContext);
  const { drawings } = useContext(editorDetailsContext);
  const [sendCode, setSendCode] = useState(0);
  function randomDisplayName() {
    return Math.round(Math.random() * 10000);
  }

  useEffect(() => {
    const username = () => {
      if (!sessionStorage.getItem('name') || !localStorage.getItem("Username")) {
        let newUsername = "Anonymous" + randomDisplayName();
        localStorage.setItem("Username", newUsername);
        return newUsername;
      } else {
        let fetchUsername = '';
        try {
          fetchUsername = sessionStorage.getItem('name')
        } catch (error) {
          fetchUsername = localStorage.getItem("Username")
        }
        return fetchUsername;
      }
    };

    if (localStorage.getItem("mode") === "dark") {
      darkToggleRef.current.checked = true;
    }

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
    socket.on("resetdata", function (data) {
      //get Default Editor Value
      langRef.current.value = data[0].lang;
      workingData.current = data[0].code;
      drawings.current = data[0].drawing
      isWorkingData.current = true;
    });

    socket.on("exit", function (data) {
      toast.info(`${data} Left! 👎`);

    });


    return () => {
      if (socket) { socket.disconnect(); setCollabIcons(null); }
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
      // socket.emit("selection", e); //disable for now
    });

    socket.on("connected", function (data) {
      //Connect New Client Event
      toast.success(`${data.user} Joined! 👍`)
      users[data.user] = data.color;
      insertWidget(data);
      let sendCurrentData = [
        {
          code: editor.getValue(),
          lang: langRef.current.value,
          drawing: drawings.current
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

  useEffect(() => {
    if (sendCode === 0) {
      return;
    }
    let encodedCode = btoa(editorRef.current.getValue());

    let encodedArgs = btoa(editorData.args);
    let encodedLang = btoa(langRef.current.value);

    const params = new URLSearchParams();
    params.append("code", encodedCode);
    params.append("args", encodedArgs);
    params.append("lang", encodedLang);
    const controller = new AbortController();
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }, signal: controller.signal
    };


    const loadingResponse = toast.loading("Code submitted! Please wait...")
    axios
      .post(`${API}/code`, params, config)
      .then((response) => {
        var response3 = atob(response.data);
        document.getElementById("outputCode").value = response3;
        toast.update(loadingResponse, { render: "Response Recieved! 😄", type: "success", isLoading: false, autoClose: 2000, theme: "dark", pauseOnFocusLoss: false });
      })
      .catch((err) => {
        toast.update(loadingResponse, { render: "Cannot compile code! 😶", type: "error", isLoading: false, autoClose: 2000, theme: "dark", pauseOnFocusLoss: false });
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [sendCode]);

  const EditorTheme = () => {
    if (darkToggleRef.current.checked) {
      localStorage.setItem("mode", "dark");
      setDarkMode(true);
    } else {
      localStorage.setItem("mode", "light");
      setDarkMode(false);
    }
  };

  const handleEditorChange = (value) => {
    sessionStorage.setItem(langRef.current.value, value)
  }
  const defaultEditorValue = () => {
    return sessionStorage.getItem(langRef.current.value) || ExampleCode[langRef.current.value]
  }
  return (
    <>
      <div
        className="container-fluid IDE py-2 px-2"
        style={{ height: "80vh", width: "100%" }}
      >
        <div className="container d-flex justify-content-between p-2">
          <div className=" d-flex" style={{ paddingLeft: "0px" }}>
            {/* <label className="form-check-label me-3 ps-0" htmlFor="flexSwitchCheckDefault">Language</label> */}

            <select
              className={`form-select ${darkMode ? "white-dropdown" : ""}`}
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
              <option value="java">Java</option>
            </select>
          </div>
          <button
            type="button"
            className={`btn btn-outline-dark px-3 py-1 text-nowrap mx-1 rounded-0 ${darkMode ? "white-btn" : ""
              }`}
            style={{
              border: "1px solid black",
              fontSize: "14px",
              boxShadow: "none",
            }}
            onClick={() => {
              setSendCode(sendCode + 1);
            }}
          >
            Run
          </button>

          <label className="switch pt-2">
            <input
              type="checkbox"
              ref={darkToggleRef}
              onChange={() => {
                EditorTheme();
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {/*  */}

        <Editor
          height="90vh"
          theme={darkMode ? "vs-dark" : "vs"}
          language={langRef.current.value}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          value={defaultEditorValue()}
          loading={<Loader />}
          onChange={handleEditorChange}
        />
      </div>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
};

export default IDE;
