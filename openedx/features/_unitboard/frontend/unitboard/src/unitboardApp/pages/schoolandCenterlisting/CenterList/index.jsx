/**
 * Center listing at school,center listing Page
 */

import React, { useState, useEffect } from 'react';


const CenterListContainer = ({centerlist}) => {


    return (
        
        <section className="learn-school">
        <div className="container listing-container">
            <h1 className="text-align-left"><b>Centers</b></h1>

            <div className="row listing-school-center" id="iconright">

                {centerlist.map((center) => (

                
                <div className="course-box1 mx-box2">
                    <div className="service-item mx-inner2 body-light tissxoff">
                        <div className="img-sec">
                            <img className="img-fluid mx-img2" 
                            src={center['center_image']} 
                            onError={(e) => {
                                e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                             }}
                            alt=""/>
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

                {/* Start No result Found  */}
                    
                {centerlist.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Centers are not available.</div>
                    </div>
                )}
                    {/* End No result Found  */}
              

            </div>
        </div>
    </section>
                    
    );
};

CenterListContainer.propTypes = {}

export default CenterListContainer
