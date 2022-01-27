import React from 'react';
import Card from './Card';


const About = () => {
  return (
      
          <div id="about" className='d-flex mx-5 px-5'>
                <Card name='Suyogya Shrivastava' subHeading='Web Developer' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aut obcaecati minus quos. Non esse illum dignissimos nobis, aut assumenda. Delectus soluta optio nostrum excepturi consequatur quia deleniti facilis nulla.' className='container border-end my-4'/>
                <Card name='Naman Khare' subHeading='Web Developer' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aut obcaecati minus quos. Non esse illum dignissimos nobis, aut assumenda. Delectus soluta optio nostrum excepturi consequatur quia deleniti facilis nulla.' className='container border-end my-4'/>
                <Card name='Aniket Kumar Singh' subHeading='Web Developer' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aut obcaecati minus quos. Non esse illum dignissimos nobis, aut assumenda. Delectus soluta optio nostrum excepturi consequatur quia deleniti facilis nulla.' className='container my-4'/>
            </div>
      
  )
};

export default About;
