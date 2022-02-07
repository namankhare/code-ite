import React, { useContext, useEffect } from "react";
import IDE from "../components/IDE";
import Header from "../components/Header";
import Whiteboard from "../components/Whiteboard";
import { Split } from "@geoffcox/react-splitter";
import Input from "../components/InputBox";
import Output from "../components/OutputBox";

import { io } from "socket.io-client";
import { API } from "../backend";
import { editorDetailsContext } from "../context/GlobalContext";

const Editor = () => {
  let socket;
  socket = io(API);
  const { darkMode } = useContext(editorDetailsContext);
  useEffect(() => {
    console.log(`Connecting socket...`);

    return () => {
      if (socket) socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className={`${darkMode ? "PrimaryDark" : ""}`}>
        <Split
          initialPrimarySize="60%"
          minPrimarySize="15%"
          minSecondarySize="10%"
          className="d-block d-md-flex flex-column"
        >
          <Split
            horizontal
            initialPrimarySize="70%"
            minPrimarySize="20px"
            minSecondarySize="20px"
          >
            <IDE socket={socket} />
            <Input />
          </Split>
          <Split
            horizontal
            initialPrimarySize="70%"
            minPrimarySize="20px"
            minSecondarySize="20px"
          >
            <Whiteboard socket={socket} />
            <Output />
          </Split>
        </Split>
      </div>
    </>
  );
};

export default Editor;
