/**
 * Course, Program and Degress
 */

import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const CourseandProgramContainer = ({courseProgramData}) => {
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
                                    <div className="item mx-home-course">
                                        <div className="service-item body-light tissxoff redirect2course"
                                        onClick={() => RedirectToPage(course_list.course_detail)}
                                        >
                                            <div className="img-sec">

                                                <img className="img-fluid" 
                                                onError={(e) => {
                                                    e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                                 }}
                                                src= {course_list.course_image} alt=""/>
                                            
                                            </div>
                                            <div className="service-text">
                                                <p className="">{course_list.course_name}</p>

                                                {/* <p className="px-2 box-short-descp">{course_list.short_description}</p> */}
                                                <p className="box-short-descp">Starts: {course_list.course_start_dt}</p>

                                                <div className="course_btn">
                                                    <span className="more_learn">Courses</span>
                                                </div>


                                                {/* <div className="py-4 border-top">
                                                    <a href={course_list.course_detail}  className="readmorebtn orgclr btn-read-more"><span></span></a>
                                                    <a href={course_list.course_detail}  className="iconbg"></a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                
                                ))}  

                                {/*start show view all courses card  */}

                                <a href="/search-detail/?learning_type=course">
                                    <div class="course-view-all">
                                        <div class="text-mid"><h6>View all Courses</h6></div>
                                
                                    </div>
                                </a>

                                {/*End show view all courses card  */}

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
                            {/* <div className="item mx-home-course">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                        <img className="img-fluid" 
                                        onError={(e) => {
                                            e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                        }}
                                        src={programs_list.program_image} alt=""/>
                                    </div>
                                    <div className="service-text">
                                        <p className="">{programs_list.program_name}</p>
                                        <p className="px-2 box-short-descp">{programs_list.short_description}</p>
                                        <div className="py-4 border-top">
                                            <a href={programs_list.program_detail} className="readmorebtn orgclr btn-read-more"><span></span></a>
                                            <a href={programs_list.program_detail} className="iconbg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                        <div className="item mx-home-program">
                        
                            <div className="program_data service-item body-light tissxoff">
                            <a className="mx-prog-link" href={programs_list.program_detail}>
                                <div className="img-Area">
                                    <img className="img-fluid program_img_data"
                                    
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                    }}
                                    src={programs_list.program_image} alt=""/>
                                </div>
                                <div className="content_box">
                                    <div className="heading_text">
                                        <h6>{programs_list.program_name}</h6>
                                        <p>{programs_list.short_description}</p>
                                    </div>
                                <div className="prf_certificate">    
                                    <a className="mx-prog-link" href={programs_list.program_detail}><span>{programs_list.program_type}</span></a>
                                    <p className="py-1">{programs_list.total_course} Courses</p>
                                </div>
                                </div>
                            </a>
                            </div>



                            </div> 
                        </div>

                        ))}  

                        {/*start show view all program card  */}

                        <a href="/search-detail/?learning_type=program">
                            <div class="program-view-all">
                                <div class="text-mid"><h6>View all Programs</h6></div>
                        
                            </div>
                        </a>

                        {/*End show view all program card  */}

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
                            {/* <div className="item">
                                <div className="service-item body-light tissxoff">
                                    <div className="img-sec">
                                        <img className="img-fluid" 
                                        onError={(e) => {
                                            e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                         }}
                                        src={degree_list.degree_image} alt=""/>
                                    </div>
                                    <div className="service-text">
                                        <p className="">{degree_list.degree_name}</p>
                                        <p className="px-2 box-short-descp">{degree_list.short_description}</p>
                                        <div className="py-4 border-top">
                                            <a href={degree_list.degree_detail} className="readmorebtn orgclr btn-read-more"><span></span></a>
                                            <a href={degree_list.degree_detail} className="iconbg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        <div className="item mx-home-program">
                            
                            <div className="program_data service-item body-light tissxoff">
                                <a className="mx-prog-link" href={degree_list.degree_detail}>
                                    <div className="img-Area">
                                        <img className="img-fluid program_img_data"
                                        
                                        onError={(e) => {
                                            e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                        }}
                                        src={degree_list.degree_image} alt=""/>
                                    </div>
                                    <div className="content_box">
                                        <div className="heading_text">
                                            <h6>{degree_list.degree_name}</h6>
                                            <p>{degree_list.short_description}</p>
                                        </div>
                                    <div className="prf_certificate">    
                                        <a className="mx-prog-link" href={degree_list.degree_detail}><span>{degree_list.degree_type}</span></a>
                                        <p className="py-1">{degree_list.total_course} Courses</p>
                                    </div>
                                    </div>
                                </a>
                                </div>


                            </div> 
                        </div>

                        ))}  

                        {/*start show view all degree card  */}

                        <a href="/search-detail/?learning_type=degree">
                            <div class="program-view-all">
                                <div class="text-mid"><h6>View all Degrees</h6></div>
                        
                            </div>
                        </a>

                        {/*End show view all degree card  */}

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
