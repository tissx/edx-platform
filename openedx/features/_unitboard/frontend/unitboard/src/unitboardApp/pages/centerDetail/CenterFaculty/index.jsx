
/**
 * Program Faculty for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterFacultyContainer = ({centerFaculty}) => {

  
    return (
      
        <section>
            <div className="container listing-container">
                <h1 className="theading-title">Programs Faculty</h1>
                <div className="row center-faculty">

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

                {/* Start No result Found  */}
                    
                {centerFaculty.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Faculty is not available.</div>
                    </div>
                )}
                {/* End No result Found  */}
                    
                </div>
            </div>
        </section>



    );
};

CenterFacultyContainer.propTypes = {}

export default CenterFacultyContainer
