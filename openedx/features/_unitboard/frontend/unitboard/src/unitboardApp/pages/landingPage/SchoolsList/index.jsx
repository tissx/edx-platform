/**
 * School listing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const SchoolsListContainer = (schoollist) => {
  
var school_listing= schoollist['schoolListData']['results']
    return (

        <section className="learn-school">
            <div className="container">
                <div className="py-5">
                    <h1 className="theading-title">Learn from schools and centers</h1>
                    <p className="para">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p>
                </div>
                <div className="row" id="iconright">
                    <h1 className="school-title">Schools</h1>

                    {/* start Dynamic schools */}

                    {school_listing.map((school) => (
      
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src={school.image} alt=""/>
                            </div>
                        
                            <p className="title p-3">{school.title}</p>
                            <div className="d-flex p-3 bor-1">
                                <a><button type="button" href="#" className="btn btn-sm btn-schoolviewmore orgclr">Read more</button></a>
                                <a className="ml-auto"><small><img src="../static/tissx-theme/images/landing_page/images/icon-1.png" className="img"/></small></a>
                            </div> 
                        </div>
                    </div>
                    ))} 
                    {/* End Dynamic schools */}

            
                </div>
            </div>
        </section>

    );
};
// }


SchoolsListContainer.propTypes = {}

export default SchoolsListContainer
