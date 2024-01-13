/**
 * Program Type on School, Center Listing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";


const SchoolCenterFilterContainer = ({programtypelist}) => {

// console.log("program degree list", programtypelist)
    return (
      
      <section className="bglight py-2">
          <div className="container listing-container">
              <h1 className="theading-title">Filter</h1> 
                
            <div className="row">

              {programtypelist.map((data) => (

              <div className="dropdown course-box1">
                  <button className="dropbtn">{data['program_type']}
                      <span className="pad-left"><i className="fa fa-chevron-down pl-3"></i></span></button>
                  <div className="dropdown-content">

                  {data.program.map((program) => (
                  <a href={program['program_detail']}>{program['program_name']}</a>

                  ))}

                  </div>
              </div>

              ))}
          </div>
        </div>
      </section>

    );
};

SchoolCenterFilterContainer.propTypes = {}

export default SchoolCenterFilterContainer
