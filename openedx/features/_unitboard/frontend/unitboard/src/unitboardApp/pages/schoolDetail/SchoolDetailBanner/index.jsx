
/**
 * Banner for School Detail Page
 */

import React, { useState, useEffect } from 'react';


const SchoolDetailBannerContainer = ({SchoolInfo}) => {
// console.log("school Info", SchoolInfo)
  
    return (
        
        <section className="position-relative" id="prg-page1">
            <img src={SchoolInfo['banner_image']} className="bg-center-school img-fluid "/>
            <div className="overlay-cap">
            <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="box-left mobile-hide">
                                <div className="card-1">
                                    <img src={SchoolInfo['school_image']} className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            <div className="pd-leftalign">
                                <h1 className="theading-title mob-hright text-white">{SchoolInfo['school_name']}</h1>
                                <p className="text-white sub-title">{SchoolInfo['description']}</p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </section>

    );
};

SchoolDetailBannerContainer.propTypes = {}

export default SchoolDetailBannerContainer
