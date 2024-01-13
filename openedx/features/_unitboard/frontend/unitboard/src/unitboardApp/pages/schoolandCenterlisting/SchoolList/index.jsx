/**
 * Schhol listing at school,Center listing Page
 */

import React, { useState, useEffect } from 'react';


const SchoolListContainer = ({schoollist}) => {


    return (
        
 
            <section className="py-5">
                <div className="container">
                    <div className="row" id="iconright">
                        <h1 className="text-align-left"><b>Schools</b></h1>

                        {schoollist.map((school)=>(

                        
                        <div className="course-box">
                            <div className="service-item body-light tissxoff">
                                <div className="img-sec">
                                    <img className="img-fluid" src={school['school_image']} alt=""/>
                                </div>
                                <p className="title p-3">{school['school_name']}</p>
                                <div className="d-flex p-3 bor-1">
                                    <a href={school['school_detail']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                    <a href={school['school_detail']}><small><img src="img/icon-1.png" className="img"/></small></a>
                                </div> 
                            </div>
                        </div>
                        ))}
                    

                    </div>
                </div>
            </section>
                    
    );
};

SchoolListContainer.propTypes = {}

export default SchoolListContainer
