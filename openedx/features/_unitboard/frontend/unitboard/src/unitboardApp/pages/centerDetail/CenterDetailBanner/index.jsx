
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterDetailBannerContainer = () => {

  
    return (
        
        <section className="position-relative" id="prg-page1">
            <img src="../static/tissx-theme/images/bg-image.png" className="img-fluid img-hide"/>
            <div className="overlay-cap">
            <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="box-left">
                                <div className="card-1">
                                    <img src="../static/tissx-theme/images/center.png" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            <div className="pd-leftalign">
                                <h1 className="theading-title mob-hright text-white">About Center</h1>
                                <p className="text-white sub-title">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing. Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
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
