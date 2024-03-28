/**
 * Center Listing Page
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';


const CentersListContainer = ({centerListData}) => {
// var center_listing= centerlist['centerListData']['results']
  
    return (

        <section className="learn-school">
            <div className="container listing-container">
                <h1 className="school-title">Centers</h1>
                <div className="row mx-box" id="iconright">

                    {/* start Dynamic center  */}
                    {centerListData.results.map((center) => (

                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" 
                                // src={center.image}
                                src={center.image?center.image: '../static/tissx-theme/images/dummy/dummy_course1.png'}

                                onError={(e) => {
                                    e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                 }}
                                alt=""/>
                            </div>
                            
                            <div className="service-text position-relativ">
                                <p className="text-school">{center.title}
                                </p>
                                <div className="d-flex p-3 bor-1">
                                    <a href={center.center_detail}><button type="button" className="btn btn-sm btn-centerviewmore orgclr">Read more</button></a>
                                    <a href={center.center_detail} className="ml-auto"><small><img src="../static/tissx-theme/images/landing_page/images/icon-1.png" className="img"/></small></a>
                                </div>  
                            </div>
                        </div>
                    </div>
                    ))} 

                    {/* End Dynamic center  */}


                    {/* Start No result Found  */}
                    
                    {centerListData.count == 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Centers are not available.</div>
                    </div>
                    )}
                    {/* End No result Found  */}

                    
                </div>
            </div>
        </section>


    );
};

CentersListContainer.propTypes = {}

export default CentersListContainer
