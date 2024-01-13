/**
 * Program and Degree listing Banner Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";


const ProgramDegreeListContainer = ({programlist}) => {

console.log("program listing", programlist)
    return (
     
        <>



        {programlist.map((program_list) => (


        
        <section className="py-5">
            <div className="container listing-container">
                <h1 className="theading-title py-5">{program_list['program_type']}</h1>
                <div className="row">


                    {program_list.program.map((program) => (

                    
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src={program['program_image']} alt=""/>
                            </div>
                        
                            <p className="title p-3">{program['program_name']}</p>
                            <div className="d-flex p-3 bor-1">
                                <a href={program['program_detail']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                <a ahref={program['program_detail']}><small><img src="img/icon-1.png" className="img"/></small></a>
                            </div> 
                        </div>
                    </div>
                    ))}
                    
                
                
                </div>
            </div>
        </section>

        ))}

{/* 
<section>
    <div className="container-fluid learn-school py-5">
        <div className="container">
                <h1 className="theading-title py-5">Post Graduate Diploma</h1>
                <div className="row">
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src="img/sc-1 (1).png" alt="/"/>
                            </div>
                            
                            <div className="service-text position-relativ">
                                <p className="text-school">Centre for Library and Information Management
                                </p>
                                <div className="d-flex p-3 bor-1">
                                    <a><button type="button" href="#" className="btn btn-sm orgclr">Read more</button></a>
                                    <a><small><img src="img/icon-1.png" className="img"/></small></a>
                                </div>  
                            </div>
                        </div>
                    </div>
                    
                   
                   
                </div>
        </div>
    </div>
</section> */}




        </>
        
    );
};

ProgramDegreeListContainer.propTypes = {}

export default ProgramDegreeListContainer
