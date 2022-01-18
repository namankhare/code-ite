import { useState, createContext } from 'react';

export const editorDetailsContext = createContext(null)
export const loginState = createContext(null)
export const collabIconsContext = createContext(null)

const initialEditorData = {
    lang: '',
    args: '',
    code: ''
}



const ContextProvider = ({ children }) => {
    const [editorData, setEditorData] = useState(initialEditorData)
    const [currentLogin, setCurrentLogin] = useState(loginState)
    const [collabIcons, setCollabIcons] = useState(collabIconsContext)

    return (
        <editorDetailsContext.Provider
            value={{ editorData, setEditorData, currentLogin, setCurrentLogin, collabIcons, setCollabIcons }}
        >
            {children}
        </editorDetailsContext.Provider>
    )


}

export default ContextProvider
