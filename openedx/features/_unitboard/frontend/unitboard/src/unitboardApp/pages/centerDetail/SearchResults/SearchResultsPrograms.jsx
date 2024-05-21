
/**
 * Program Listing for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const SearchResultsProgramsContainer = ({ProgramResults}) => {


    var program_dict = {};
    for (let i = 0; i < ProgramResults.results.length; i++) {

        if(program_dict[ProgramResults.results[i].program_type_slug]){

            program_dict[ProgramResults.results[i].program_type_slug].push(ProgramResults.results[i])
        }
        else {
            program_dict[ProgramResults.results[i].program_type_slug] = [ProgramResults.results[i]]
        }
    } 

// console.log("Inside loop", program_dict['certificate-programmes'])

    return (
    <>
        {Object.keys(program_dict).map((keyName, i) => (
        <section>
            <div className="container-fluid learn-school py-2">
            <div className="container listing-container">
                <div>
                    <h1 className="text-align-left"><b> {program_dict[keyName][0]['type']}</b></h1>
                </div>

                <div className="row certificateprg mx-box" id="iconright">

                {Object.keys(program_dict[keyName]).map((keyNames, j) => (


                    <div className="program_data service-item body-light tissxoff mx-center-program">
                          <a className="mx-prog-link" href={(program_dict[keyName][keyNames]['program_or_degree'] == "program")? ("../program-detail/" + program_dict[keyName][keyNames]['uuid']) :("../degree-detail/" + program_dict[keyName][keyNames]['uuid']) }>
                              <div className="img-Area">
                                  <img className="img-fluid program_img_data"
                                  
                                    src={program_dict[keyName][keyNames]['banner_image']}
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                    }}
                                    alt=""/>
                              </div>
                              <div className="content_box">
                                  <div className="heading_text">
                                      <h6>{program_dict[keyName][keyNames]['title']}</h6>
                                      <p>{program_dict[keyName][keyNames]['mx_program_descrp']}</p>

                                  </div>
                              <div className="prf_certificate">    
                                  {/* <a className="mx-prog-link"><span>{program_dict[keyName][keyNames]['type']}</span></a> */}

                                  <a className="mx-prog-link"><span>{(program_dict[keyName][keyNames]['type'].charAt(program_dict[keyName][keyNames]['type'].length - 1) == "s")?(program_dict[keyName][keyNames]['type'].slice(0, -1)): program_dict[keyName][keyNames]['type'] }</span></a>

                                  <p className="py-1">{program_dict[keyName][keyNames]['mx_no_of_courses']} Courses</p>
                              </div>
                              </div>


                          </a>
                        </div>
                    
                    ))}
                 </div>

                </div>
            </div>
        </section>
        ))}
    </>
    );
};

SearchResultsProgramsContainer.propTypes = {}

export default SearchResultsProgramsContainer
