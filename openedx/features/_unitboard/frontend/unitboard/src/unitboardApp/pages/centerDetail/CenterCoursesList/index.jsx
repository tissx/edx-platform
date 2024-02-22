
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterCoursesListContainer = ({centerInfo, centerCourses}) => {

  
    return (
        <>
        {/* // start Filter For Mobile */}
        {/* <section className="bglight py-5" id="hidedesktop">
            <div className="container">
                <h1 className="theading-title">Filter</h1> 
            <div className="row">
                <div className="mb-1">
                    <button className="collapsible">Open Collapsible</button>
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>
            </div>
        </section> */}
        {/* // End Filter For Mobile */}


        {/* start short description and Courses Listing  */}
        
        <div className="container-fluid">
                <div className="row px-3" id="cbox-left">
                    <div className="col-md-12 col-sm-12 pb-5 bg-light">
                        <h1 className="theading-title py-3">Center Offerings</h1> 
                        <p className="para">{centerInfo['short_description']}</p>
                        <h1 className="text-align-left"><b>Courses</b></h1>
                        <div className="row" id="iconright">
                       
                       {centerCourses.map((course)=> (

                        <div className="course-box1">
                            <div className="service-item body-light overflow-hidden">
                                <img className="img-fluid" src={course['course_image']} alt=""/>
                                <p className="text-school p-3">{course['course_name']}</p>
                                <div className="d-flex py-3 px-4 bor-1">
                                    <a href={course['course_link']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                    <a href={course['course_link']}><small><img className="img moreicon"/></small></a>
                                </div>
                            </div>
                        </div>

                        ))}
                        
                    </div>
                    </div>

                    {/* End short description and Courses Listing  */}

                    {/* start Program and Program Type Filter  */}

                    {/* <div className="col-md-3 col-sm-12" id="filteright">
                        <h1 className="theading-title">Filters</h1>
                        <div className="dropdown fi-border">
                            <button className="dropbtn">Graded Certificates
                                <span className="pad-left"><i class="fa fa-chevron-down pl-3"></i></span></button>
                            <div className="dropdown-content">
                            <p className="p-2 w-100">Enter here your filter items</p>
                            </div>
                        </div>
                       
                        <div className="bottom-fil">
                            <div className="d-flex py-3 border-top bor-dash">
                                <div className="w-50"><button type="button" href="#" class="btn btn-sm orgclr btn-read-more">Applied Filter</button></div>
                                <div className="w-50 text-right"><small>Clear All</small></div>
                            </div>
                            <div className="">
                                <div className="dropdown fi-border">
                                    <button className="dropbtn">Graded Certificates
                                        <span className="pad-left"><i className="fa fa-close pl-3"></i></span></button>
                                </div>
                                <div className="dropdown fi-border">
                                    <button className="dropbtn">Graded Certificates
                                        <span className="pad-left"><i className="fa fa-close pl-3"></i></span></button>
                                </div>
                                
                            </div>
                        </div>        
                    </div> */}

                    {/* End Program and Program Type Filter  */}


                </div>
        </div>



        </>


    );
};

CenterCoursesListContainer.propTypes = {}

export default CenterCoursesListContainer
