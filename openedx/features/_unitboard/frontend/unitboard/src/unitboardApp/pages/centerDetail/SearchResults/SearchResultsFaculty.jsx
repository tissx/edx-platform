
/**
 * Program Faculty for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const SearchResultsFacultyContainer = ({FacultyResults}) => {

  
    return (
      
        <section>
            <div className="container listing-container">
                <h1 className="theading-title">Programs Faculty</h1>
                <div className="row center-faculty">

                    {FacultyResults.results.map((faculty) => (
                        
                    <div className="col-md-4 col-sm-4 col-lg-4 mb-2">
                        <div className="card service-box center-faculty-card">
                            <div className="text-center"><img src={faculty['profile_image_url']} className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="text-center faculty-name"><b>{faculty['full_name']}</b></h5>
                                <p className="text-center para  px-2">{faculty['bio']}</p>
                            </div>
                        </div>
                    </div>

                    ))}

                {/* Start No result Found  */}
                    
                {FacultyResults.count== 0 && (
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

SearchResultsFacultyContainer.propTypes = {}

export default SearchResultsFacultyContainer
