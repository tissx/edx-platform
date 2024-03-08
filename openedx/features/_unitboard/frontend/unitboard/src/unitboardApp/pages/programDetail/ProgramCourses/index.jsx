/**
 * Program Courses Page
 */

import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



const ProgramCoursesContainer = (program_course) => {
    // console.log("program course", program_course)
    const option = {
        rtl:false,
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    }
        
    return (
        <>
                    
        <div className="learn-school program-course">
            <div className="container">
                <div>
                    <h1 className="theading-title">Objectives</h1>
                    <p className="para">{program_course.programinfo['program_description']['objectives']}</p>
                </div>
                <h1 className="prg-course-title"><b>Programme Courses</b></h1>
                <div className="row py-3" id="iconright1">  

                    <OwlCarousel className='owl-theme' {...option}>
                    
                    {program_course.programcourses.map((course_list) => (

                        <div className="item">
                            <div className="item">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                    <img className="img-fluid" 
                                    src={course_list['course_image']}
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                     }}
                                    alt=""/>
                                    </div>
                                    <div className="service-text position-relativ p-2">
                                        <p>{course_list['course_name']} </p>
                                        <p className="px-2 box-short-descp">{course_list['course_description']} </p>
                                        <div className="py-4 border-top">
                                            <a href={course_list['course_link']}  className="readmorebtn orgclr"><span></span></a>
                                            <a href={course_list['course_link']}  className="iconbg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                     ))}   

                    </OwlCarousel>

                {/* Start No result Found  */}
                    
                {program_course.programcourses.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Courses are not available.</div>
                    </div>
                )}
                {/* End No result Found  */}

                </div>
            </div>
        </div>

       </>
    );
};

ProgramCoursesContainer.propTypes = {}

export default ProgramCoursesContainer
// 