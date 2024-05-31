/**
 * Program Courses Page
 */

import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const DegreeCoursesContainer = (program_course) => {
    const option = {
        rtl:false,
        loop:false,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        slideBy:4,

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
    
    const RedirectToPage = (redirect_url) => {
        window.location.href = redirect_url
    }

    return (
        <>
                    
        <div className="learn-school program-course">
            <div className="container">
                <div>
                    <h1 className="theading-title">Objectives</h1>
                    <p className="para">{program_course.programinfo['program_description']['objectives']}</p>
                </div>
                <h1 className="prg-course-title"><b>Degree Courses</b></h1>
                <div className="row py-3" id="iconright1">  

                    <OwlCarousel className='owl-theme' {...option}>
                    
                    {program_course.programcourses.map((course_list) => (

                        <div className="item">
                            <div className="item mx-prg-detail-course">
                                <div className="service-item body-light tissxoff redirect2course"
                                onClick={() => RedirectToPage(course_list['course_link'])}
                                >
                                    <div className="img-sec">
                                    <img className="img-fluid" 
                                    src={course_list['course_image']}
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                     }}
                                    alt=""/>
                                    </div>
                                    <div className="service-text position-relativ">
                                        <p className="program-course-title">{course_list['course_name']} </p>

                                        <p className="box-short-descp">Starts: {course_list.course_start_dt}</p>

                                        <div className="course_btn">
                                            <span className="more_learn">Course</span>
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

DegreeCoursesContainer.propTypes = {}

export default DegreeCoursesContainer
// 