import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LeftHeroSection from '../components/LeftHeroSection'
import heroImg from '../assets/svg/collaboration.svg'
import About from '../components/About'

const Home = () => {
    return (
        <div>
            <Header />
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className=''><LeftHeroSection /></div>
                    </div>
                    <div className="d-none d-md-block col-md-6 my-auto">
                        <div className=''><img src={heroImg} alt="heroImg" className='w-75 justify-content-center' /> </div>
                    </div>
                </div>
            </div>

            <About />

            <Footer />

        </div>
    )
}

export default Home
