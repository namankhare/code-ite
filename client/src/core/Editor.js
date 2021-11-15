import React, { useEffect } from 'react'
import IDE from '../components/IDE'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
// import Output from '../components/Output'
import Whiteboard from '../components/Whiteboard'
import "../assets/css/Editor.css";
import { disconnectSocket, subscribeToChat } from '../socketio.service'

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
            <div className="d-flex">
                <IDE />
                <Whiteboard />
                {/* <Output /> */}

            </div>
        </>
    )
}

export default Editor

