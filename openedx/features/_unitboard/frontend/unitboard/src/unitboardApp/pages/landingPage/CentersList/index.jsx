/**
 * Center Listing Page
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';


const CentersListContainer = (centerlist) => {
var center_listing= centerlist['centerListData']['results']
  
    return (

        <section className="learn-school">
            <div className="container listing-container">
                <h1 className="theading-title">Centers</h1>
                <div className="row" id="iconright">

                    {/* start Dynamic center  */}
                    {center_listing.map((center) => (

                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src={center.image} alt=""/>
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

                    
                </div>
            </div>
        </section>


    );
};

CentersListContainer.propTypes = {}

export default CentersListContainer
