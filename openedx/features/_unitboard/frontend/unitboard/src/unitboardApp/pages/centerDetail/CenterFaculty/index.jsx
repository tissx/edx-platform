
/**
 * Program Faculty for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterFacultyContainer = ({centerFaculty}) => {

  
    return (
      
        <section className="py-5">
            <div className="container listing-container">
                <h1 className="theading-title pb-5">Programme Faculty</h1>
                <div className="row justify-content-center">

                    {centerFaculty.map((faculty) => (
                        
                    <div className="col-md-4 col-sm-4 col-lg-4 p-3">
                        <div className="card service-box-1 overflow-hidden h-100">
                            <div className="pad-card text-center"><img src={faculty['image']} className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="text-center"><b>{faculty['name']}</b></h5>
                                <p className="text-center para">{faculty['description']}</p>
                            </div>
                        </div>
                    </div>

                    ))}

                    
                </div>
            </div>
        </section>



    );
};

CenterFacultyContainer.propTypes = {}

export default CenterFacultyContainer
