/**
 * Program Info Page
 */

import React, { useState, useEffect } from 'react';


const DegreeinfoContainer = (programinfo) => {
    // console.log("programInfo", programinfo.programinfo)
    return (
            <>
        <section className="bgreen1" id="prg-page">
        {/* <section className="program-detail-section" id="prg-page"> */}

        {/* <img className="img-fluid img-hide program-detail-img"  src={programinfo.programinfo['banner_image']} alt="" /> */}

            <div className="container listing-container">
                <div className="row">
                    <div className="col-md-7 col-sm-12 f-cell">
                        <h1 className="theading-title-white">{programinfo.programinfo['program_name']}</h1>
                        <p className="text-white pb-20">{programinfo.programinfo['school_name']}</p>
                        {/* <form className="example banner-form" >
                            <input type="text" placeholder="Email me..." name="search2"/>
                            <button className="greenbg" type="submit"><img src="img/icon-2.png" className="img-fluid banner-form-icon" /></button>
                        </form> */}
                    </div>
                    <div className="offset-md-5">
                        
                    </div>
                </div>
            </div>
        </section>

        <section className="bgreen-light py-3">
        <div className="container listing-container">
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    <h1 className="theading-title">About Degree</h1>
                    <p className="para">
                    {programinfo.programinfo['program_description']['about']}
                    </p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="greencard">
                        <div className="px-3 py-3">
                            <h6 className="title-p display-6 text-white"><b> {programinfo.programinfo['number_of_course']}</b></h6>
                            <small className="para">No. of courses</small>
                        </div>
                        <div className="px-3">
                            <h6 className="title-p display-6 text-white"><b>{programinfo.programinfo['paced_type']}</b></h6>
                            <small className="para">Self paced / Regular</small>
                        </div>
                        <div className="px-3 py-3">
                            <h6 className="title-p display-6 text-white"><b>{programinfo.programinfo['duration']} Year</b></h6>
                            <small className="para">Duration</small>
                        </div>
                        <div className="d-flex text-white py-4 bor-rad aboutprg">
                            <div className="w-50-1 px-3">Total Cost</div>
                            <div className="w-50 text-right px-3"><h4 className="program-cost">₹{programinfo.programinfo['cost']}</h4></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </section>
</>

    );
};


DegreeinfoContainer.propTypes = {}

export default DegreeinfoContainer
