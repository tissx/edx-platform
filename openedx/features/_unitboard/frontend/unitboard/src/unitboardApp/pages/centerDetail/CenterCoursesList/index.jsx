
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterCoursesListContainer = ({centerInfo, centerCourses}) => {

  
    return (
        <>
        
        <section className="bg-light">
        <div className="container">
                <div className="row" id="cbox-left">
                    <div className="col-md-12 col-sm-12 bg-light">
                        <h1 className="theading-title">Center Offerings</h1> 
                        <p className="para">{centerInfo['short_description']}</p>
                        <h1 className="text-align-left"><b>Courses</b></h1>
                        <div className="row mx-box" id="iconright">
                       
                       {centerCourses.map((course)=> (

                        <div className="course-box">
                            <div className="service-item body-light overflow-hidden">
                                <div className="img-sec1">
                                <img className="img-fluid mx-box-img"
                                 src={course['course_image']}
                                 onError={(e) => {
                                    e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                 }}
                                 alt=""/>
                                </div>
                                
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

        </section>



        </>


    );
};

CenterCoursesListContainer.propTypes = {}

export default CenterCoursesListContainer
