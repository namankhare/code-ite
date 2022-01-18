import React from 'react'
import IDE from '../components/IDE'
import Header from '../components/Header'
import Whiteboard from '../components/Whiteboard'
import { Split } from '@geoffcox/react-splitter';
import Input from '../components/InputBox'
import Output from '../components/OutputBox';

const Editor = () => {

    return (
        <>
            <Header />
            <div className="" >
                <Split initialPrimarySize='60%' minPrimarySize='15%' minSecondarySize='10%' className="d-block d-md-flex flex-column">
                    <Split horizontal initialPrimarySize="67%" minPrimarySize='20px' minSecondarySize='20px'>
                        <IDE />
                        <Input />
                    </Split>
                    <Split horizontal initialPrimarySize="67%" minPrimarySize='20px' minSecondarySize='20px'>
                        <Whiteboard />
                        <Output />
                    </Split>
                </Split>
            </div>


        </>
    )
}

export default Editor

