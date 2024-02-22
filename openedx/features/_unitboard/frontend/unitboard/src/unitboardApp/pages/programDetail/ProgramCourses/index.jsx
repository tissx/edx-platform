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
                    
        <div className="learn-school mb-3">
            <div className="container">
                <div className="py-3">
                    <h1 className="theading-title">Objectives</h1>
                    <p className="para">{program_course.programinfo['program_description']['objectives']}</p>
                </div>
                <h1 className="py-5 prg-course-title"><b>Programme Courses</b></h1>
                <div className="row" id="iconright1">  
                    {/* <div className="owl-carousel owl-theme">
                            
                        <div className="item">
                            <div className="item">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                    <img className="img-fluid" src="img/Tissx-offering.png" alt=""/>
                                    </div>
                                    <div className="service-text position-relativ p-2">
                                        <p>Eklavya India </p>
                                        <p className="px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="py-4 border-top">
                                            <a className="readmorebtn orgclr"><span></span></a>
                                            <a className="iconbg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                    </div> */}

                    <OwlCarousel className='owl-theme' {...option}>
                    

                    {program_course.programcourses.map((course_list) => (

                        <div className="item">
                            <div className="item">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                    <img className="img-fluid" src={course_list['course_image']}  alt=""/>
                                    </div>
                                    <div className="service-text position-relativ p-2">
                                        <p>{course_list['course_name']} </p>
                                        <p className="px-2">{course_list['course_description']} </p>
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


                </div>
            </div>
        </div>

       </>
    );
};

ProgramCoursesContainer.propTypes = {}

export default ProgramCoursesContainer
// 