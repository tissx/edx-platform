
/**
 * Program Faculty for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const SearchResultsFacultyContainer = ({my_discovery_url, FacultyResults}) => {

  
    return (
      
        <section className="center-faculty-section">
            <div className="container listing-container pt-3">
                <h1 className="theading-title pb-3">Centre Faculty</h1>
                <div className="row center-faculty">

                    {FacultyResults.results.map((faculty) => (
                        
                    <div className="col-md-4 col-sm-4 col-lg-4 mb-4">
                        <div className="card service-box center-faculty-card">
                            <div className="text-center"><img src={my_discovery_url + faculty['profile_image_url']} className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="text-center faculty-name"><b>{faculty['full_name']}</b></h5>
                                <p className="text-center para faculty-desc px-2">{faculty['bio']}</p>
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
