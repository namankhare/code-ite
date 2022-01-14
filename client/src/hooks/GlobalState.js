import { useState, createContext } from 'react';

export const editorDetailsContext = createContext(null)


const initialEditorData = {
    lang: '',
    args: '',
    code: ''
}



const ContextProvider = ({ children }) => {
    const [editorData, setEditorData] = useState(initialEditorData)

    return (
        <editorDetailsContext.Provider
            value={{ editorData, setEditorData }}
        >
            {children}
        </editorDetailsContext.Provider>
    )


}

export default ContextProvider
