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
                    <button className="nav-link active" id="course-tab" data-bs-toggle="tab" data-bs-target="#course" type="button" role="tab" aria-controls="home" aria-selected="true">Courses</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="program-tab" data-bs-toggle="tab" data-bs-target="#program" type="button" role="tab" aria-controls="program" aria-selected="false">Programs</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="degree-tab" data-bs-toggle="tab" data-bs-target="#degree" type="button" role="tab" aria-controls="degree" aria-selected="false">Degrees</button>
                </li>
                </ul>
                <div className="tab-content py-3" id="myTabContent">
                    {/* start Course tab data */}
                    <div className="tab-pane fade show active" id="course" role="tabpanel" aria-labelledby="course-tab">
                     
                     {/* Start sub tab  */}

                     <div className="row" id="inner_Tab">
                        <ul className="nav nav-tabs px-3" id="myTab1" role="tablist">
                        {(courseProgramData.upcoming_courses.length >0)?(
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab" aria-controls="upcoming" aria-selected="true">Upcoming</button>
                            </li>
                        ):("")}

                        {(courseProgramData.current_courses.length >0)?(
                            <li className="nav-item" role="presentation">
                                <button className={(courseProgramData.upcoming_courses.length ==0)?("nav-link active"):("nav-link")} id="current-tab" data-bs-toggle="tab" data-bs-target="#current" type="button" role="tab" aria-controls="current" aria-selected="false" tabindex="-1">Current Courses</button>
                            </li>
                        ):("")}
                            

                            {(courseProgramData.archived_courses.length >0)?(
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="archived-tab" data-bs-toggle="tab" data-bs-target="#archived" type="button" role="tab" aria-controls="archived" aria-selected="false" tabindex="-1">Archived</button>
                            </li>
                            ):("")}

                            {(courseProgramData.oer_courses.length >0)?(
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="oers-tab" data-bs-toggle="tab" data-bs-target="#oers" type="button" role="tab" aria-controls="oers" aria-selected="false" tabindex="-1">OERs</button>
                            </li>
                            ):("")}
                            
                        </ul>

                        <div className="tab-content py-4" id="myTabContent1">

                            {/* Start Upcoming course  */}
                            {(courseProgramData.upcoming_courses.length >0)?(
                            <div className="tab-pane fade active show" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">

                                <div className="row" id="iconright1">  
                                {/* start Dynamic Upcoming Course */}
                                <OwlCarousel className='owl-theme' {...option}>
                                {courseProgramData.upcoming_courses.map((upcoming) => (
                                <div className="item">
                                    <div className="item mx-home-course">
                                        <div className="service-item body-light tissxoff redirect2course"
                                        onClick={() => RedirectToPage(upcoming.course_detail)}
                                        >
                                            <div className="img-sec">
                                                <img className="img-fluid" 
                                                onError={(e) => {
                                                    e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                                    }}
                                                src= {upcoming.course_image} alt=""/>
                                            </div>
                                            <div className="service-text">
                                                <p className="" title={upcoming.course_name}>{upcoming.course_name}</p>
                                                <p className="box-short-descp">Starts: {upcoming.course_start_dt}</p>
                                                <div className="course_btn">
                                                    <span className="more_learn">Course</span>

                                                    {/* {(upcoming.linked_program)?(<span className="prog-label" title={upcoming.linked_program}>{(upcoming.linked_program.charAt(upcoming.linked_program.length - 1) == ",")?(upcoming.linked_program.slice(0, -1)): upcoming.linked_program}</span>): ("")} */}
                                                    {(upcoming.linked_program)?(<span className="prog-label" title={upcoming.linked_program.slice(0, -1)}>{upcoming.linked_program.slice(0, -1)}</span>): ("")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                ))}  
                                {/*start show view all courses card  */}
                                <a href="/search-detail/?learning_type=course&course_state=upcoming">
                                    <div class="course-view-all">
                                        <div class="text-mid"><h6>View all Courses</h6></div>
                                    </div>
                                </a>
                                {/*End show view all courses card  */}
                                </OwlCarousel>
                                {/* END Dynamic Upcoming Course */}
                                </div>  
                            </div>    

                            ):("")}
                            {/* End Upcoming course  */}
                            

                            {/* Start Current course  */}
                            {(courseProgramData.current_courses.length >0)?(
                            <div className={(courseProgramData.upcoming_courses.length ==0)?("tab-pane fade active show"):("tab-pane fade")} id="current" role="tabpanel" aria-labelledby="current-tab">
                                <div className="row" id="iconright1">  
                                    {/* start Dynamic Current Course */}
                                    <OwlCarousel className='owl-theme' {...option}>
                                    {courseProgramData.current_courses.map((current) => (
                                    <div className="item">
                                        <div className="item mx-home-course">
                                            <div className="service-item body-light tissxoff redirect2course"
                                            onClick={() => RedirectToPage(current.course_detail)}
                                            >
                                                <div className="img-sec">
                                                    <img className="img-fluid" 
                                                    onError={(e) => {
                                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                                        }}
                                                    src= {current.course_image} alt=""/>
                                                </div>
                                                <div className="service-text">
                                                    <p className="" title={current.course_name}>{current.course_name}</p>
                                                    <p className="box-short-descp">Starts: {current.course_start_dt}</p>
                                                    <div className="course_btn">
                                                        <span className="more_learn">Course</span>
                                                        {/* {(current.linked_program)?(<span className="prog-label" title={current.linked_program}>{(current.linked_program.charAt(current.linked_program.length - 1) == ",")?(current.linked_program.slice(0, -1)): current.linked_program}</span>): ("")} */}
                                                        {(current.linked_program)?(<span className="prog-label" title={current.linked_program.slice(0, -1)}>{current.linked_program.slice(0, -1)}</span>): ("")}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    ))}  
                                    {/*start show view all courses card  */}
                                    <a href="/search-detail/?learning_type=course&course_state=current">
                                        <div class="course-view-all">
                                            <div class="text-mid"><h6>View all Courses</h6></div>
                                        </div>
                                    </a>
                                    {/*End show view all courses card  */}
                                    </OwlCarousel>
                                    {/* END Dynamic Current Course */}
                                </div>
                            </div>
                            ):("")}
                            {/* End Current course  */}


                            {/* Start Archived course  */}
                            {(courseProgramData.archived_courses.length >0)?(
                           <div className="tab-pane fade" id="archived" role="tabpanel" aria-labelledby="archived-tab">
                                <div className="row" id="iconright1">  
                                        {/* start Dynamic Archived Course */}
                                        <OwlCarousel className='owl-theme' {...option}>
                                        {courseProgramData.archived_courses.map((archived) => (
                                        <div className="item">
                                            <div className="item mx-home-course">
                                                <div className="service-item body-light tissxoff redirect2course"
                                                onClick={() => RedirectToPage(archived.course_detail)}
                                                >
                                                    <div className="img-sec">
                                                        <img className="img-fluid" 
                                                        onError={(e) => {
                                                            e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                                            }}
                                                        src= {archived.course_image} alt=""/>
                                                    </div>
                                                    <div className="service-text">
                                                        <p className="" title={archived.course_name}>{archived.course_name}</p>
                                                        <p className="box-short-descp">Starts: {archived.course_start_dt}</p>
                                                        <div className="course_btn">
                                                            <span className="more_learn">Course</span>
                                                            {/* {(archived.linked_program)?(<span className="prog-label" title={archived.linked_program}>{(archived.linked_program.charAt(archived.linked_program.length - 1) == ",")?(archived.linked_program.slice(0, -1)): archived.linked_program}</span>): ("")} */}
                                                            {(archived.linked_program)?(<span className="prog-label" title={archived.linked_program.slice(0, -1)}>{archived.linked_program.slice(0, -1)}</span>): ("")}
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        ))}  
                                        {/*start show view all courses card  */}
                                        <a href="/search-detail/?learning_type=course&course_state=archived">
                                            <div class="course-view-all">
                                                <div class="text-mid"><h6>View all Courses</h6></div>
                                            </div>
                                        </a>
                                        {/*End show view all courses card  */}
                                        </OwlCarousel>
                                        {/* END Dynamic Archived Course */}
                                </div>
                           </div>
                            ):("")}

                            {/* End Archived course  */}



                            {/* Start OERs course  */}

                            {(courseProgramData.oer_courses.length >0)?(
                                <div className="tab-pane fade" id="oers" role="tabpanel" aria-labelledby="oers-tab">
                                    <div className="row" id="iconright1">  
                                            {/* start Dynamic OERs Course */}
                                            <OwlCarousel className='owl-theme' {...option}>
                                            {courseProgramData.oer_courses.map((oer) => (
                                            <div className="item">
                                                <div className="item mx-home-course">
                                                    <div className="service-item body-light tissxoff redirect2course"
                                                    onClick={() => RedirectToPage(oer.course_detail)}
                                                    >
                                                        <div className="img-sec">
                                                            <img className="img-fluid" 
                                                            onError={(e) => {
                                                                e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                                                }}
                                                            src= {oer.course_image} alt=""/>
                                                        </div>
                                                        <div className="service-text">
                                                            <p className="" title={oer.course_name}>{oer.course_name}</p>
                                                            <p className="box-short-descp">Starts: {oer.course_start_dt}</p>
                                                            <div className="course_btn">
                                                                <span className="more_learn">Course</span>
                                                                {/* {(oer.linked_program)?(<span className="prog-label" title={oer.linked_program}>{(oer.linked_program.charAt(oer.linked_program.length - 1) == ",")?(oer.linked_program.slice(0, -1)): oer.linked_program}</span>): ("")} */}
                                                                {(oer.linked_program)?(<span className="prog-label" title={oer.linked_program.slice(0, -1)}>{oer.linked_program.slice(0, -1)}</span>): ("")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            ))}  
                                            {/*start show view all courses card  */}
                                            <a href="/search-detail/?learning_type=course&course_state=oer">
                                                <div class="course-view-all">
                                                    <div class="text-mid"><h6>View all Courses</h6></div>
                                                </div>
                                            </a>
                                            {/*End show view all courses card  */}
                                            </OwlCarousel>
                                            {/* END Dynamic OERs Course */}
                                    </div>
                                </div>
                            ):("")}

                            {/* End OERs course  */}


                        </div>
                    </div>

                     {/* End sub tab  */}

                   

                </div>
                    {/* END Course tab data */}

                    {/* start Program tab data */}
                <div className="tab-pane fade" id="program" role="tabpanel" aria-labelledby="program-tab">

                    <div className="row" id="iconright1">  
                      {/* start Dynamic Program */}
                      <OwlCarousel className='owl-theme' {...option}>
                        {courseProgramData.programs.map((programs_list) => (
                        <div className="item">
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
                                        <h6 title={programs_list.program_name}>{programs_list.program_name}</h6>
                                        <p>{programs_list.short_description}</p>
                                    </div>
                                <div className="prf_certificate">    
                                  <a className="mx-prog-link"><span>{(programs_list.program_type.charAt(programs_list.program_type.length - 1) == "s")?(programs_list.program_type.slice(0, -1)): programs_list.program_type}</span></a>
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

                <div className="tab-pane fade" id="degree" role="tabpanel" aria-labelledby="degree-tab">
                    <div className="row" id="iconright1">  
                     {/* start Dynamic Degree */}

                      <OwlCarousel className='owl-theme' {...option}>
                        {courseProgramData.degrees.map((degree_list) => (
                        <div className="item">
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
                                            <h6 title={degree_list.degree_name}>{degree_list.degree_name}</h6>
                                            <p>{degree_list.short_description}</p>
                                        </div>
                                    <div className="prf_certificate">    
                                  <a className="mx-prog-link"><span>{(degree_list.degree_type.charAt(degree_list.degree_type.length - 1) == "s")?(degree_list.degree_type.slice(0, -1)): degree_list.degree_type}</span></a>
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
