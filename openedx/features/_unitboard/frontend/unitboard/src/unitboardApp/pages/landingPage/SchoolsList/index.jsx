/**
 * School listing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const SchoolsListContainer = ({schoolListData}) => {
  
// var school_listing= schoolListData['results']
    return (

        <section className="learn-school">
            <div className="container listing-container">
                <div className="py-5">
                    <h1 className="theading-title">Learn from schools and centres</h1>
                    <p className="para">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
                </div>

                <div class="border-bottom"><h1 className="school-title">Schools</h1></div>


                <div className="row mx-box p_tb" id="iconright">
                    {/* <h1 className="school-title">Schools</h1> */}


                    {/* start Dynamic schools */}

                    {schoolListData.results.map((school) => (
      
                    <div className="course-box">
                        <a className="mx-link" href={school.school_detail}>
                            <div className="service-item body-light tissxoff">
                                <div className="img_area">
                                    <img className="img-fluid sch_card" 
                                    // src={school.image}
                                    src={school.image?school.image: '../static/tissx-theme/images/dummy/dummy_course1.png'}
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                    }} alt=""/>
                                </div>
                            
                                <p className="title p-3">{school.title}</p>
                                {/* <div className="d-flex p-3 bor-1">
                                    <a href={school.school_detail}><button type="button" className="btn btn-sm btn-schoolviewmore orgclr">Read more</button></a>
                                    <a href={school.school_detail} className="ml-auto"><small><img src="../static/tissx-theme/images/landing_page/images/icon-1.png" className="img"/></small></a>
                                </div>  */}
                            </div>
                        </a>
                    </div>


                    ))} 
                    {/* End Dynamic schools */}

                    {/* Start No result Found  */}
                    
                    {schoolListData.count == 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Schools are not available.</div>
                    </div>
                    )}
                    {/* End No result Found  */}

            
                </div>
            </div>
        </section>

    );
};
// }


SchoolsListContainer.propTypes = {}

export default SchoolsListContainer
