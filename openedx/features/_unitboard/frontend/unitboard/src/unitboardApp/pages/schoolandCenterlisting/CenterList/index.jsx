/**
 * Center listing at school,center listing Page
 */

import React from 'react';

const CenterListContainer = ({centerlist}) => {

    return (
        
        <section className="learn-school">
        <div className="container listing-container">
            <h1 className="text-align-left"><b>Independent Centres</b></h1>
            <div className="row listing-school-center mx-box p_tb" id="iconright">

                {centerlist.map((center) => (

                <div className="course-box">
                    <a className="mx-link" href={center['center_detail']}>
                        <div className="service-item body-light tissxoff">
                            <div className="img_area">
                                <img className="img-fluid sch_card" 
                                src={center['center_image']} 
                                onError={(e) => {
                                    e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                }}
                                alt=""/>
                            </div>
                            <p className="title p-3">{center['center_name']}</p>
                        </div>
                    </a>
                </div>

                ))}

                {/* Start No result Found  */}
                    
                {centerlist.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Centres are not available.</div>
                    </div>
                )}
                    {/* End No result Found  */}
              
            </div>
        </div>
    </section>
                    
    );
};

CenterListContainer.propTypes = {}

export default CenterListContainer
