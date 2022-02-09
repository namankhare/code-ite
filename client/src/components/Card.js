import React from 'react';

const Card = ({ name, subHeading, desc, className, img, linkedin, github, insta }) => {
  return (
    <div className={className}>
      <div className="container-fluid d-flex-column justify-content-center py-3 ">

        <img src={img} className='border border primary rounded-circle mx-auto d-block' height="150px" width="150px" alt="" />


        <div className='mt-5 mb-3'>
          <h4 className='text-center'>{name}</h4>
          <h6 className='text-center'>{subHeading}</h6>
        </div>

        <p className='text-center mb-5'>{desc}</p>
        <div className="d-flex justify-content-evenly fs-2 ">
          <a href={linkedin} target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin text-dark"></i></a>
          <a href={github} target="_blank" rel="noreferrer"><i className="fa-brands fa-github github-icon text-dark"></i></a>
          <a href={insta} target="_blank" rel="noreferrer"><i className="fab fa-instagram-square text-dark"></i></a>
        </div>
      </div>
    </div>
  )
};

export default Card;
