
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterDetailBannerContainer = ({centerInfo}) => {

  
    return (
        
        <section className="position-relative" id="prg-page1">
            <img src={centerInfo['banner_image']} className="img-fluid bg-center-school"/>
            <div className="overlay-cap">
            <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="box-left mobile-hide">
                                <div className="card-1">
                                    <img src={centerInfo['center_image']} className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            <div className="pd-leftalign">
                                <h1 className="theading-title mob-hright text-white">{centerInfo['center_name']}</h1>
                                <p className="text-white sub-title">{centerInfo['description']}</p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </section>

    );
};

CenterDetailBannerContainer.propTypes = {}

export default CenterDetailBannerContainer
