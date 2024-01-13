
/**
 * Program Faculty for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterFacultyContainer = () => {

  
    return (
      
        <section className="py-5">
            <div className="container listing-container">
                <h1 className="theading-title pb-5">Programme Faculty</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-sm-4 col-lg-4 p-3">
                        <div className="card service-box-1 overflow-hidden h-100">
                            <div className="pad-card text-center"><img src="img/prg-img (2).png" className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="text-center"><b>Lorem ipsum dolor</b></h5>
                                <p className="text-center para">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 p-3">
                        <div className="card service-box-1 overflow-hidden h-100">
                            <div className="pad-card text-center"><img src="img/prg-img (3).png" className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="title text-center"><b>Lorem ipsum dolor</b></h5>
                                <p className="text-center para">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 p-3">
                        <div className="card service-box-1 overflow-hidden h-100">
                            <div className="pad-card text-center"><img src="img/circle-img.png" className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="text-center"><b>Lorem ipsum dolor</b></h5>
                                <p className="text-center para">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    );
};

CenterFacultyContainer.propTypes = {}

export default CenterFacultyContainer
