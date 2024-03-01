/**
 * How To Apply Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";


const HowToApplyContainer = () => {
 
    return (
        <>
            
        <div className="container-fluid learn-school greencard-2">
            <div className="container">
            <h1 className="theading-title-white text-center py-2">How To Apply?</h1>
            <p className="text-white text-center py-2">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
            <div className="row justify-content-center">
                <div className="col-md-4 col-sm-4 col-lg-4">
                <div className="service-box text-white overflow-hidden h-100">
                        <div className="box-inner"></div>
                        <div className="p-4 text-center">
                            <h5 className="text-white">Step-1</h5>
                            <p className="para">Guideline Option 1</p>
                
                        </div>
                </div>
                </div>
                <div className="col-md-4 col-sm-4 col-lg-4">
                    <div className="service-box text-white overflow-hidden h-100">
                        <div className="box-inner"></div>
                        <div className="p-4 text-center">
                            <h5 className="text-white">Step-2</h5>
                            <p className="para">Guideline Option 1</p>
                        </div>
                        
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-lg-4">
                    <div className="service-box text-white overflow-hidden h-100">
                        <div className="box-inner"></div>
                        <div className="p-4 text-center">
                            <h5 className="text-white">Step-3</h5>
                            <p className="para">Guideline Option 1</p>
                
                        </div>
                    </div>
                </div>
            </div>
                <div className="text-center">
                    <button className="btn btn-card-round"><a href="#">Go to application portal</a></button>
                </div>
            </div>
        </div>
       </>
    );
};

HowToApplyContainer.propTypes = {}

export default HowToApplyContainer
// 