import { useState, createContext, useRef } from "react";
const initialEditorData = {
  lang: "",
  args: "",
  code: "",
};
export const editorDetailsContext = createContext(null);
export const loginState = createContext(null);

const defaultColorMode = () => {
  if (
    localStorage.getItem("mode") === "dark" ||
    localStorage.getItem("mode") === "light"
  ) {
    return localStorage.getItem("mode") === "dark" ? true : false;
  } else {
    let currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem("mode", currentMode ? "dark" : "light");
    return currentMode;
  }
};

const ContextProvider = ({ children }) => {
  const [editorData, setEditorData] = useState(initialEditorData);
  const [currentLogin, setCurrentLogin] = useState(loginState);
  const [collabIcons, setCollabIcons] = useState(null);
  const [darkMode, setDarkMode] = useState(defaultColorMode);
  const darkToggleRef = useRef(null);

  return (
    <editorDetailsContext.Provider
      value={{
        editorData,
        setEditorData,
        currentLogin,
        setCurrentLogin,
        collabIcons,
        setCollabIcons,
        darkToggleRef,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </editorDetailsContext.Provider>
  );
};

export default ContextProvider;
