import React, { useEffect } from 'react'
import IDE from '../components/IDE'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
// import Output from '../components/Output'
import Whiteboard from '../components/Whiteboard'
import "../assets/css/Editor.css";
import { disconnectSocket, subscribeToChat } from '../socketio.service'
import { Split } from '@geoffcox/react-splitter';
import Output from '../components/Output'
import Input from '../components/Input'


const Editor = () => {
    const { room } = useParams();
    const randomUser = () => {
        const savedName = localStorage.getItem("name");
        if (savedName === null) {
            var person = prompt("Please enter your name", "code-ite");
            localStorage.setItem("name", person);
            return person
        }

        return savedName
    }
    useEffect(() => {

        subscribeToChat(room, randomUser())
        return () => {
            disconnectSocket();
        }
    }, []);
    return (
        <>
            <Header />
            <div className="d-flex" >
                <Split initialPrimarySize='50%'>
                    <Split horizontal initialPrimarySize="60%">
                        <IDE />
                        <Input />
                    </Split>
                    <Whiteboard />
                </Split>

            </div>
        </>
    )
}

export default Editor

