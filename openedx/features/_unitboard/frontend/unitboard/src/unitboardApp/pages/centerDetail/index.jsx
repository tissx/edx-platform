
/**
 * School and Center listing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";
import CenterDetailBanner from './CenterDetailBanner';
import CenterCoursesAndProgramType from './CenterCoursesAndProgramType';
import CenterProgramList from './CenterProgramList';
import CenterFaculty from './CenterFaculty';

const CenterDeatilContainer = ({my_discovery_url}) => {

//   const [schoolcenterlist, setschoolcenterlist] = useState([]);

//   useEffect(() => {
    
 
// var school_center_type_list_url = `${my_discovery_url}/api/v1/get-school-center-list`

// //start Fetch school, center and program type listing from discovery
//   fetch(school_center_type_list_url)
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     // console.log("school, center and program type listing",data);
//     setschoolcenterlist(data);
//   });
// //End Fetch school, center and program type listing from discovery



//   }, []);
  
    return (
        <>
        <CenterDetailBanner/>
        {/* {!R.isEmpty(schoolcenterlist) && schoolcenterlist.length !== 0 && <SchoolCenterFilter programtypelist={schoolcenterlist.programtype} />}  */}
        <CenterCoursesAndProgramType/>
        <CenterProgramList/>
        <CenterFaculty/>
       </>
    );
};

CenterDeatilContainer.propTypes = {}

export default CenterDeatilContainer
