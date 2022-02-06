import React from 'react';

const Card = ({name,subHeading,desc,className}) => {
  return(
    <div className={className}>
        <div className="container-fluid d-flex-column justify-content-center py-3 ">
            
                <img src="https://i.pinimg.com/originals/f8/2f/ba/f82fbac7514f944aacc0257445c1f89e.jpg" className='  border border primary rounded-circle mx-auto d-block'  height="150px" width="150px" alt="" />
            
            
            <div className='mt-5 mb-3'>
                <h4 className='text-center'>{name}</h4>
                <h6 className='text-center'>{subHeading}</h6>
            </div>

            <p className='text-center mb-5'>{desc}</p>
            <div className="d-flex justify-content-evenly fs-2 ">
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-github github-icon"></i>
                <i className="fab fa-instagram-square"></i>
            </div>
        </div>
    </div>
  ) 
};

export default Card;
