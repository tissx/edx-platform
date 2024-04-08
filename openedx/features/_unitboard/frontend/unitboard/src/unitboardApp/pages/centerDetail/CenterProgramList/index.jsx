
/**
 * Program Listing for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterProgramListContainer = ({programList}) => {

  
    return (
<>
    {programList.map((program_list) => (

        <section>
        <div className="container-fluid learn-school py-2">
            <div className="container listing-container">
                <div>
                    <h1 className="text-align-left"><b>{program_list['program_type']}</b></h1>
                </div>
                <div className="row certificateprg mx-box" id="iconright">

                    {program_list.program.map((program) => (

                    // <div className="course-box">
                    //     <div className="service-item body-light overflow-hidden">
                    //         <img className="img-fluid set-img mx-box-img" 
                    //         src={program['program_image']} 
                    //         onError={(e) => {
                    //             e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                    //          }}
                    //         alt=""/>
                    //         <div className="service-text position-relativ">
                    //             <p className="text-school">{program['program_name']}
                    //             </p>
                    //             <div className="d-flex py-3 px-4 bor-1">
                    //                 <a href={program['program_detail']} ><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                    //                 <a href={program['program_detail']} className="ml-auto"><small><img className="img moreicon"/></small></a>
                    //             </div> 
                    //         </div>
                    //     </div>
                    // </div>

                    <div className="program_data service-item body-light tissxoff mx-center-program">
                          <a className="mx-prog-link" href={program['program_detail']}>
                              <div className="img-Area">
                                  <img className="img-fluid program_img_data"
                                  
                                    src={program['program_image']} 
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                    }}
                                    alt=""/>
                              </div>
                              <div className="content_box">
                                  <div className="heading_text">
                                      <h6>{program['program_name']}</h6>
                                      <p>{program['program_descrip']}</p>
                                      
                                  </div>
                              <div className="prf_certificate">    
                                  <a className="mx-prog-link" href={program['program_detail']}><span>{program_list['program_type']}</span></a>
                                  <p className="py-1">{program['no_of_course']} Courses</p>
                              </div>
                              </div>
                          </a>
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
