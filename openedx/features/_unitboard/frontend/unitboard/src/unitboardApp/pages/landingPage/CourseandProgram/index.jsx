/**
 * Course, Program and Degress
 */

import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import * as R from "ramda";


// const CourseandProgramContainer = (props) => {
const CourseandProgramContainer = () => {
    const [courseprogramlist, setcourseprogramlist] = useState([]);

    
    useEffect(() => {
      
    //start Fetch course, program and degree from discovery
    fetch('http://discovery.local.overhang.io:8381/api/v1/lms-course-program-list')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
    //   console.log("course program list",data);
      setcourseprogramlist(data);
    });
    //End Fetch course, program and degree from discovery
  
    }, []);

// if(!R.isEmpty(courseprogramlist) &&  courseprogramlist.length !== 0){
    // console.log("courseProgramData", courseprogramlist.courses)


    return (
        
        <section className="bgreen-light pt-5">
        <div className="container">
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
                        <div className="owl-carousel owl-theme">
                                {/* start Dynamic Course */}

                    {!R.isEmpty(courseprogramlist) && courseprogramlist.length !== 0 && courseprogramlist.courses.map((courses_list) => (

                                <div className="item">
                                    <div className="item">
                                        <div className="service-item body-light tissxoff">
                                            <div className="img-sec">
                                                <img className="img-fluid" src="../static/tissx-theme/images/landing_page/images/course_01.png" alt=""/>
                                            </div>
                                            <div className="service-text">
                                                <p className="p-2">{courses_list.course_name}</p>
                                                <p className="px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <div className="py-4 border-top">
                                                    <a className="readmorebtn orgclr"><span></span></a>
                                                    <a className="iconbg"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                    ))} 
                                {/* END Dynamic Course */}
                        </div>
                        </div>
                </div>
                    {/* END Course tab data */}

                    {/* start Program tab data */}
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <div className="row" id="iconright1">  
                        <div className="owl-carousel owl-theme">
                            {/* start Dynamic Program */}
                            <div className="item">
                                <div className="item">
                                    <div className="service-item body-light tissxoff">
                                        <div className="img-sec">
                                            <img className="img-fluid" src="../static/tissx-theme/images/landing_page/images/course_01.png" alt=""/>
                                        </div>
                                        <div className="service-text">
                                            <p className="p-2">TISS Program</p>
                                            <p className="px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <div className="py-4 border-top">
                                                <a className="readmorebtn orgclr"><span></span></a>
                                                <a className="iconbg"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END Dynamic Program */}
                        </div>
                    </div>
                </div>
                    {/* END Course tab data */}


                    {/* start Degree tab data */}

                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                <div className="row" id="iconright1">  
                        <div className="owl-carousel owl-theme">
                            {/* start Dynamic Degree */}
                            <div className="item">
                                <div className="item">
                                    <div className="service-item body-light tissxoff">
                                        <div className="img-sec">
                                            <img className="img-fluid" src="../static/tissx-theme/images/landing_page/images/course_01.png" alt=""/>
                                        </div>
                                        <div className="service-text">
                                            <p className="p-2">TISS Degree</p>
                                            <p className="px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <div className="py-4 border-top">
                                                <a className="readmorebtn orgclr"><span></span></a>
                                                <a className="iconbg"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END Dynamic Degree */}
                        </div>
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
