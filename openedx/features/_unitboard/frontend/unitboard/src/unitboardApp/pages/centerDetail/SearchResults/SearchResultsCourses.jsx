
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat'


const SearchResultsCoursesContainer = ({ CourseResults}) => {

  
    return (
        <>
        
        <section>
        <div className="container listing-container pt-3">
                <div className="row" id="cbox-left">
                    <div className="col-md-12 col-sm-12">
                        
                        <h1 className="text-align-left center-course-title"><b>Courses</b></h1>
                        <div className="row center-courses" id="iconright">
                       
                        {CourseResults.results.map((course)=> (

                            <div className="mx-center-course">

                                <div className="service-item body-light tissxoff">
                                    <a className="center-course-box-link" href={'../courses/' +course['course_runs'][0]['key'] + '/about'}>
                                        <div className="img-sec">
                                        <img className="img-fluid" 
                                        src={course['card_image_url']} 
                                        onError={(e) => {
                                            e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                        }}
                                        alt=""/>
                                        </div>

                                        <p className="title course-title">{course['title']}</p>
                                        <p className="box-short-descp">Starts: {dateFormat( course['course_runs'][0]['start'], "mmmm dd, yyyy")}</p>
                                        
                                        <div className="course_btn">
                                            <span className="more_learn">Course</span>
                                        </div>

                                        {/* <div className="service-text position-relativ p-2">
                                            <p className="program-course-title">{course['course_name']} </p>
                                            <p className="px-2 box-short-descp">{course['course_description']} </p>
                                            <div className="py-4 border-top">
                                                <a href={course['course_link']}  className="readmorebtn orgclr center-course-link"><span></span></a>
                                                <a href={course['course_link']}  className="iconbg"></a>
                                            </div>
                                        </div> */}
                                    </a>
                                </div>
                            </div>

                        ))}

                        {/* Start No result Found  */}
                    
                        {CourseResults.count== 0 && (
                        <div className="no-result-found">
                            <div className="no-result-found-msg">Courses are not available.</div>
                        </div>
                        )}
                    {/* End No result Found  */}

                    
                        
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

SearchResultsCoursesContainer.propTypes = {}

export default SearchResultsCoursesContainer
