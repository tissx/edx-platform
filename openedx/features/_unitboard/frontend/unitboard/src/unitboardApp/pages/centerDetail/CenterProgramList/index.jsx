
/**
 * Program Listing for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterProgramListContainer = () => {

  
    return (
        <section>
        <div className="container-fluid learn-school py-5">
            <div className="container">
                <div>
                    <h1 className="text-align-left"><b>Certificate Programs</b></h1>
                </div>
                <div className="row certificateprg" id="iconright">
                    <div className="course-box">
                        <div className="service-item body-light overflow-hidden">
                            <img className="img-fluid" src="img/sc-1 (1).png" alt=""/>
                            <div className="service-text position-relativ">
                                <p className="text-school">Centre for Library and Information Management
                                </p>
                                <div className="d-flex py-3 px-4 bor-1">
                                    <a><button type="button" href="#" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                    <a className="ml-auto"><small><img src="img/icon-1.png" className="img"/></small></a>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>


    );
};

CenterProgramListContainer.propTypes = {}

export default CenterProgramListContainer
