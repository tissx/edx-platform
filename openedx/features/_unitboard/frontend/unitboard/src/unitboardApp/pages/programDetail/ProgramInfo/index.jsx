/**
 * Program Info Page
 */

import React, { useState, useEffect } from 'react';


const ProgramInfoContainer = (programinfo) => {
    // console.log("programInfo", programinfo.programinfo)
    return (
            <>
        <section className="bgreen1" id="prg-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-sm-12 f-cell">
                        <h1 className="theading-title-white">{programinfo.programinfo['program_name']}</h1>
                        <p className="text-white pb-20">School Name</p>
                        <form className="example banner-form" >
                            <input type="text" placeholder="Email me..." name="search2"/>
                            <button className="greenbg" type="submit"><img src="img/icon-2.png" className="img-fluid banner-form-icon" /></button>
                        </form>
                    </div>
                    <div className="offset-md-5">
                        
                    </div>
                </div>
            </div>
        </section>

        <section className="bgreen-light py-5">
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    <h1 className="theading-title">About Programme</h1>
                    <p className="para">
                    {programinfo.programinfo['program_description']}
                    </p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="greencard">
                        <div className="px-3 py-3">
                            <h6 className="title-p display-6 text-white"><b> {programinfo.programinfo['number_of_course']}</b></h6>
                            <small className="para">No. of courses</small>
                        </div>
                        <div className="px-3">
                            <h6 className="title-p display-6 text-white"><b>Regular</b></h6>
                            <small className="para">Self paced / Regular</small>
                        </div>
                        <div className="px-3 py-3">
                            <h6 className="title-p display-6 text-white"><b>2 Year</b></h6>
                            <small className="para">Duration</small>
                        </div>
                        <div className="d-flex text-white py-4 bor-rad aboutprg">
                            <div className="w-50-1 px-3">Total Cost</div>
                            <div className="w-50 text-right px-3"><h4 className="program-cost">₹12500</h4></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </section>
</>

    );
};


ProgramInfoContainer.propTypes = {}

export default ProgramInfoContainer
