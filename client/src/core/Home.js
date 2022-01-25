import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LeftHeroSection from '../components/LeftHeroSection'
import heroImg from '../assets/svg/home-heroSec.svg'

const Home = () => {
    return (
        <div>
            <Header />
            <div className="d-flex">
                <div className='d-flex w-50'><LeftHeroSection /></div>
                <div className='d-flex w-50 '><img src={heroImg} alt="heroImg" className='w-100'/> </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
