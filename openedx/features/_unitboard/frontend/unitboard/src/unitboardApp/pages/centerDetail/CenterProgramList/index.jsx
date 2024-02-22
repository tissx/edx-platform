
/**
 * Program Listing for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterProgramListContainer = ({programList}) => {

  
    return (
<>
    {programList.map((program_list) => (

        <section>
        <div className="container-fluid learn-school py-5">
            <div className="container listing-container">
                <div>
                    <h1 className="text-align-left"><b>{program_list['program_type']}</b></h1>
                </div>
                <div className="row certificateprg" id="iconright">

                    {program_list.program.map((program) => (

                    <div className="course-box">
                        <div className="service-item body-light overflow-hidden">
                            <img className="img-fluid set-img" src={program['program_image']} alt=""/>
                            <div className="service-text position-relativ">
                                <p className="text-school">{program['program_name']}
                                </p>
                                <div className="d-flex py-3 px-4 bor-1">
                                    <a href={program['program_detail']} ><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                    <a href={program['program_detail']} className="ml-auto"><small><img className="img moreicon"/></small></a>
                                </div> 
                            </div>
                        </div>
                    </div>
                    
                    ))}
                </div>
            </div>
        </div>
    </section>
    ))}
</>
    );
};

CenterProgramListContainer.propTypes = {}

export default CenterProgramListContainer
