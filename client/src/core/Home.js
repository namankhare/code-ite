import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LeftHeroSection from '../components/LeftHeroSection'

import About from '../components/About'




const Home = () => {
    return (
        <div>
            <Header />
            <div className="d-flex Dark">
                <div className='d-flex w-100'><LeftHeroSection /></div>
                {/* <div className='d-flex w-50 '><img src={heroImg} alt="heroImg" className='w-100'/> </div> */}
            </div>
            <About/>
            
            <Footer/>
            
        </div>
    )
}

export default Home
