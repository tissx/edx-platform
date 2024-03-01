/**
 * Course, Program and Degress
 */

import React, { useState, useEffect } from 'react';
import {$, jQuery} from 'jquery';
import * as R from "ramda";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const CourseandProgramContainer = ({courseProgramData}) => {
    // console.log("course Program Data", courseProgramData)
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
        
        <section className="bgreen-light pt-5">
        <div className="container listing-container">
        <h1 className="theading-title">TISSx Offerings</h1>
            <div className="tabstextdark">
            <ul className="nav nav-tabs border-5" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Courses</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Programs</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Degrees</button>
                </li>
                </ul>
                <div className="tab-content py-5" id="myTabContent">
                    {/* start Course tab data */}
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row" id="iconright1">  
                        {/* <div className="owl-carousel owl-theme"> */}
                                {/* start Dynamic Course */}

                                <OwlCarousel className='owl-theme' {...option}>

                                {courseProgramData.courses.map((course_list) => (

                                <div className="item">
                                    <div className="item">
                                        <div className="service-item body-light tissxoff">
                                            <div className="img-sec">
                                                <img className="img-fluid" src= {course_list.course_image} alt=""/>

                                                {/* <img className="img-fluid" 
                                                onError={(e) => {
                                                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/2048px-No_sign.svg.png' // some replacement image
                                                 }}
                                                src= {course_list.course_image} alt=""/> */}
                                            
                                            </div>
                                            <div className="service-text">
                                                <p className="p-2">{course_list.course_name}</p>
                                                {/* <div className="wrappercl"> */}

                                                {/* <div className="short-descp"> */}
                                                <p className="px-2 box-short-descp">{course_list.short_description}</p>

                                                {/* </div> */}
                                                {/* </div> */}

                                                <div className="py-4 border-top">
                                                    <a href={course_list.course_detail}  className="readmorebtn orgclr btn-read-more"><span></span></a>
                                                    <a href={course_list.course_detail}  className="iconbg"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                
                                ))}  

                                </OwlCarousel>
                                {/* END Dynamic Course */}

                        {/* </div> */}
                        </div>

                </div>
                    {/* END Course tab data */}

                    {/* start Program tab data */}
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <div className="row" id="iconright1">  
                      {/* start Dynamic Program */}

                      <OwlCarousel className='owl-theme' {...option}>

                        {courseProgramData.programs.map((programs_list) => (

                        <div className="item">
                            <div className="item">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                        <img className="img-fluid" src={programs_list.program_image} alt=""/>
                                    </div>
                                    <div className="service-text">
                                        <p className="p-2">{programs_list.program_name}</p>
                                        <p className="px-2 box-short-descp">{programs_list.short_description}</p>
                                        <div className="py-4 border-top">
                                            <a href={programs_list.program_detail} className="readmorebtn orgclr btn-read-more"><span></span></a>
                                            <a href={programs_list.program_detail} className="iconbg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                        ))}  

                        </OwlCarousel>
                        {/* END Dynamic Program */}
                    </div>
                </div>
                    {/* END Program tab data */}


                    {/* start Degree tab data */}

                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                    <div className="row" id="iconright1">  
                     {/* start Dynamic Degree */}

                      <OwlCarousel className='owl-theme' {...option}>

                        {courseProgramData.degrees.map((degree_list) => (

                        <div className="item">
                            <div className="item">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                        <img className="img-fluid" src={degree_list.degree_image} alt=""/>
                                    </div>
                                    <div className="service-text">
                                        <p className="p-2">{degree_list.degree_name}</p>
                                        <p className="px-2 box-short-descp">{degree_list.short_description}</p>
                                        <div className="py-4 border-top">
                                            <a href={degree_list.degree_detail} className="readmorebtn orgclr btn-read-more"><span></span></a>
                                            <a href={degree_list.degree_detail} className="iconbg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                        ))}  

                        </OwlCarousel>
                        {/* END Dynamic Degree */}

                    </div>

                </div>

                    {/* END Degree tab data */}

                </div>
            </div>
        </div>
        </section>


    );
// }

};

CourseandProgramContainer.propTypes = {}

// export default CourseandProgramContainer
export default CourseandProgramContainer;
