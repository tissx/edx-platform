/**
 * Schhol listing at school,Center listing Page
 */

import React, { useState, useEffect } from 'react';


const SchoolListContainer = ({schoollist}) => {

    return (
 
            <section>
                <div className="container">
                    <div className="row listing-school-center" id="iconright">
                        <h1 className="text-align-left"><b>Schools</b></h1>

                        {schoollist.map((school)=>(

                        
                        <div className="course-box1 mx-box2">
                            <div className="service-item body-light tissxoff">
                                <div className="img-sec">
                                    <img className="img-fluid" 
                                    src={school['school_image']} 
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                     }}
                                    alt=""/>
                                </div>
                                <p className="title p-3">{school['school_name']}</p>
                                <div className="d-flex p-3 bor-1">
                                    <a href={school['school_detail']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                    <a href={school['school_detail']}><small><img className="img moreicon"/></small></a>
                                </div> 
                            </div>
                        </div>
                        ))}
                    

                    {/* Start No result Found  */}
                    
                    {schoollist.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Schools are not available.</div>
                    </div>
                    )}
                    {/* End No result Found  */}

                    </div>
                </div>
            </section>
                    
    );
};

SchoolListContainer.propTypes = {}

export default SchoolListContainer
