/**
 * Schhol listing at school,Center listing Page
 */

import React from 'react';


const SchoolListContainer = ({schoollist}) => {
    return (
            <section>
                <div className="container">
                    <div className="row listing-school-center mx-box p_tb" id="iconright">
                        <h1 className="text-align-left"><b>Schools</b></h1>

                        {schoollist.map((school)=>(
                        <div className="course-box">
                        <a className="mx-link" href={school['school_detail']}>
                            <div className="service-item body-light tissxoff">
                                <div className="img_area">
                                    <img className="img-fluid sch_card" 
                                    src={school['school_image']} 
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                        }}
                                    alt=""/>
                                </div>
                                <p className="title p-3">{school['school_name']}</p>
                              
                            </div>
                        </a>
                        </div>

                        ))}

                    {/* Start No result Found  */}
                    
                    {schoollist.length== 0 && (
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

SchoolListContainer.propTypes = {}

export default SchoolListContainer
