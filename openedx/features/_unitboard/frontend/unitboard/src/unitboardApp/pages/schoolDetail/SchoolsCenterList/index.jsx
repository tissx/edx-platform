
/**
 * Center list page for School Detail Page
 */

import React, { useState, useEffect } from 'react';


const SchoolsCenterListContainer = ({SchoolInfo, CenterList}) => {

  
    return (
        <>
     
        {/* start short description and center Listing  */}
        <section className="bg-light">
            <div className="container">
                    <div className="row px-3" id="cbox-left">
                        <div className="col-md-12 col-sm-12 bg-light">
                            <h1 className="theading-title">School Offerings</h1> 
                            <p className="para">{SchoolInfo['short_description']}</p>
                            <h1 className="text-align-left"><b>Centres</b></h1>
                            {/* <div className="row mx-box center-at-school" id="iconright"> */}
                            <div className="row mx-box p_tb" id="iconright">

                            {CenterList.map((center) => (
                            // <div className="course-box">
                            //     <div className="service-item body-light overflow-hidden">
                            //         <img className="img-fluid mx-box-img" 
                            //         src={center['center_image']} 
                            //         onError={(e) => {
                            //             e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                            //          }}
                            //         alt=""/>
                            //         <p className="text-school p-3">{center['center_name']}</p>
                            //         <div className="d-flex py-3 px-4 bor-1">
                            //             <a href={center['center_detail']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                            //             <a href={center['center_detail']}><small><img  className="img moreicon"/></small></a>
                            //         </div>
                            //     </div>
                            // </div>

                            <div className="course-box">
                                <a className="mx-link" href={center['center_detail']}>
                                    <div className="service-item body-light tissxoff">
                                        <div className="img_area">
                                            <img className="img-fluid sch_card" 
                                            src={center['center_image']} 
                                            onError={(e) => {
                                                e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                            }}
                                            alt=""/>
                                        </div>
                                        <p className="title p-3">{center['center_name']}</p>
                                    </div>
                                </a>
                            </div>
                            ))}
                            

                        {/* Start No result Found  */}
                    
                        {CenterList.length== 0 && (
                        <div className="no-result-found">
                            <div className="no-result-found-msg">Centres are not available.</div>
                        </div>
                        )}
                        {/* End No result Found  */}
                        
                        </div>


                        
                        </div>

                        {/* End short description and Center Listing  */}

                    </div>
            </div>
        </section>



        </>


    );
};

SchoolsCenterListContainer.propTypes = {}

export default SchoolsCenterListContainer
