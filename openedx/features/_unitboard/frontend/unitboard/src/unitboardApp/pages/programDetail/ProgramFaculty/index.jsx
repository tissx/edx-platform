/**
 * Program Faculty Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";


const ProgramFacultyContainer = (programfaculty) => {
 

    return (
    
                
        <section className="learn-school bg-light py-5">
            <div className="container">
            <h1 className="theading-title py-5">Programme Faculty</h1>
            <div className="row justify-content-center">

            {programfaculty.programfaculty.map((faculty) => (

                <div className="col-md-4 col-sm-4 col-lg-4 mb-2">
                    <div className="card service-box overflow-hidden h-100">
                        <div className="pad-card text-center"><img src={faculty['image']} className="img-fluid"/></div>
                        <div className="card-title">
                            <h5 className="text-center"><b>{faculty['name']}</b></h5>
                            <p className="text-center para px-2">{faculty['description']}</p>
                        </div>
                    </div>
                </div>
               
            ))}


            </div>
                
            </div>
        </section>

       
    );
};

ProgramFacultyContainer.propTypes = {}

export default ProgramFacultyContainer
// 