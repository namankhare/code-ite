import React, { useContext } from 'react';
import Card from './Card';
import '../assets/css/Animation.css'
import { editorDetailsContext } from "../context/GlobalContext";
import naman from '../assets/img/naman_khare.jpeg'
import suyogya from '../assets/img/suyogya.jpeg'
import aniket from '../assets/img/aniket.jpg'






const About = () => {
  const { scroll } = useContext(editorDetailsContext);

  return (

    <div id="about" className='d-flex-column d-lg-flex Dark' style={{ padding: "0 96px" }} ref={scroll}>
      <Card name='Aniket Kumar Singh' subHeading='Web Developer' desc='I am Currently Pursuing B.E. from BIT(Bangalore) in IT. I contributed in the Frontend and UI design of the project.' className='container border-top  my-4 aniket shadow-sm p-3 mb-5 me-2 bg-body rounded' img={aniket} linkedin="https://www.linkedin.com/in/aniket1104/" github="https://github.com/aniket1104" insta="https://www.instagram.com/aniket.2001_/" />
      <Card name='Naman Khare' subHeading='Web Developer' desc='I am currently pursuing B.E from Chandigarh University in CSE. I focused on the server side and on client side of the project.' className='container border-top  my-4 naman shadow-sm p-3 mb-5 me-2 bg-body rounded' img={naman} linkedin="https://www.linkedin.com/in/namankhare/" github="https://github.com/namankhare" insta="https://www.instagram.com/naman_khare/" />
      <Card name='Suyogya Shrivastava' subHeading='Web Developer' desc='I am Currently Pursuing B.Tech from NSUT in IT(IOT). I contributed in client and server side of the project.' className='container border-top  my-4 suyo shadow-sm p-3 mb-5 me-2 bg-body rounded' img={suyogya} linkedin="https://www.linkedin.com/in/suyogya7065/" github="https://github.com/Suyo7065" insta="https://www.instagram.com/suyogya__shrivastava/" />
    </div>

  )
};

export default About;


