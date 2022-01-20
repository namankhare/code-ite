import { useState, createContext, useRef } from 'react';
const initialEditorData = {
    lang: '',
    args: '',
    code: ''
}
export const editorDetailsContext = createContext(null)
export const loginState = createContext(null)







const ContextProvider = ({ children }) => {
    const [editorData, setEditorData] = useState(initialEditorData)
    const [currentLogin, setCurrentLogin] = useState(loginState)
    const [collabIcons, setCollabIcons] = useState(null)
    const myUsername = useRef(null) //using localstorage instead

    return (
        <editorDetailsContext.Provider
            value={{ editorData, setEditorData, currentLogin, setCurrentLogin, collabIcons, setCollabIcons, myUsername }}
        >
            {children}
        </editorDetailsContext.Provider>
    )


}

export default ContextProvider
