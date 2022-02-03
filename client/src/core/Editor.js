import React, { useEffect } from 'react'
import IDE from '../components/IDE'
import Header from '../components/Header'
import Whiteboard from '../components/Whiteboard'
import { Split } from '@geoffcox/react-splitter';
import Input from '../components/InputBox'
import Output from '../components/OutputBox';

import { io } from 'socket.io-client';
import { API } from '../backend';

const Editor = () => {

    let socket;
    socket = io(API);

useEffect(() => {
    console.log(`Connecting socket...`);

  return () => {
    if (socket) socket.disconnect();
  };
}, [socket]);


    return (
        <>
            <Header />
            <div className="" >
                <Split initialPrimarySize='60%' minPrimarySize='15%' minSecondarySize='10%' className="d-block d-md-flex flex-column">
                    <Split horizontal initialPrimarySize="70%" minPrimarySize='20px' minSecondarySize='20px'>
                        <IDE socket={socket}/>
                        <Input />
                    </Split>
                    <Split horizontal initialPrimarySize="67%" minPrimarySize='20px' minSecondarySize='20px'>
                        <Whiteboard socket={socket}/>
                        <Output />
                    </Split>
                </Split>
            </div>


        </>
    )
}

export default Editor

