/**
 * Center listing at school,center listing Page
 */

import React, { useState, useEffect } from 'react';


const CenterListContainer = ({centerlist}) => {


    return (
        
        <section className="learn-school">
        <div className="container listing-container">
            <h1 className="text-align-left"><b>Centers</b></h1>

            <div className="row" id="iconright">

                {centerlist.map((center) => (

                
                <div className="course-box1">
                    <div className="service-item body-light tissxoff">
                        <div className="img-sec">
                            <img className="img-fluid" src={center['center_image']} alt=""/>
                        </div>
                        
                        <div className="service-text position-relativ">
                            <p className="text-school">{center['center_name']}
                            </p>
                            <div className="d-flex p-3 bor-1">
                                <a href={center['center_detail']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                
                                <a href={center['center_detail']}><small><img className="img moreicon"/></small></a>
                            </div>  
                        </div>
                    </div>
                </div>

                ))}
              

            </div>
        </div>
    </section>
                    
    );
};

CenterListContainer.propTypes = {}

export default CenterListContainer
