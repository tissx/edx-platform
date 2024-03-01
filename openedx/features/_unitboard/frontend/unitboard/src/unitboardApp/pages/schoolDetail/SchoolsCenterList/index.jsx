
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
                            <h1 className="text-align-left"><b>Centers</b></h1>
                            <div className="row mx-box" id="iconright">

                            {CenterList.map((center) => (
                            <div className="course-box">
                                <div className="service-item body-light overflow-hidden">
                                    <img className="img-fluid mx-box-img" src={center['center_image']} alt=""/>
                                    <p className="text-school p-3">{center['center_name']}</p>
                                    <div className="d-flex py-3 px-4 bor-1">
                                        <a href={center['center_detail']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                        <a href={center['center_detail']}><small><img  className="img moreicon"/></small></a>
                                    </div>
                                </div>
                            </div>
                            ))}
                            
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
