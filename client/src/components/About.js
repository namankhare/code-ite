import React from 'react';
import Card from './Card';
import '../assets/css/Animation.css'


const About = () => {
  return (
      
          <div id="about" className='d-flex-column d-md-flex Dark' style={{padding : "0 96px"}}>
                <Card  name='Suyogya Shrivastava' subHeading='Web Developer' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aut obcaecati minus quos. Non esse illum dignissimos nobis, aut assumenda. Delectus soluta optio nostrum excepturi consequatur quia deleniti facilis nulla.' className='container border-top  my-4 suyo shadow-sm p-3 mb-5 me-2 bg-body rounded'/>
                <Card  name='Naman Khare' subHeading='Web Developer' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aut obcaecati minus quos. Non esse illum dignissimos nobis, aut assumenda. Delectus soluta optio nostrum excepturi consequatur quia deleniti facilis nulla.' className='container border-top  my-4 naman shadow-sm p-3 mb-5 me-2 bg-body rounded'/>
                <Card  name='Aniket Kumar Singh' subHeading='Web Developer' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aut obcaecati minus quos. Non esse illum dignissimos nobis, aut assumenda. Delectus soluta optio nostrum excepturi consequatur quia deleniti facilis nulla.' className='container border-top  my-4 aniket shadow-sm p-3 mb-5 me-2 bg-body rounded'/>
            </div>
      
  )
};

export default About;


