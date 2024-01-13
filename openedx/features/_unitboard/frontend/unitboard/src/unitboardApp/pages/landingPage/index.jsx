/**
 * Landing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseandProgram from './CourseandProgram';
import SchoolsList from './SchoolsList';
import CentersList from './CentersList';
import BannerSectionContainer from './BannerSection';
import * as R from "ramda";

// import {courseProgramDataFetching} from './data/actions';


const LandingPageContainer = () => {
  const dispatch = useDispatch();
  // const { my_discovery_url } = useSelector(state => state.initialContext);
  
  // dispatch(courseProgramDataFetching());


  const [schoollist, setschoollist] = useState([]);
  const [centerlist, setcenterlist] = useState([]);
  const [courseprogramlist, setcourseprogramlist] = useState([]);

  useEffect(() => {
    

//start Fetch course, program and degree from discovery
fetch('http://discovery.local.overhang.io:8381/api/v1/lms-course-program-list')
.then((res) => {
  return res.json();
})
.then((data) => {
//   console.log("course program list",data);
  setcourseprogramlist(data);
});
//End Fetch course, program and degree from discovery

    // console.log("courseProgramData", courseprogramlist.courses)
   


  //start Fetch school from discovery
    fetch('http://discovery.local.overhang.io:8381/api/v1/lms-school-list')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("school list",data);
        setschoollist(data);
      });
  //End Fetch school from discovery

  //start Fetch center from discovery
  fetch('http://discovery.local.overhang.io:8381/api/v1/lms-center-list')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log("center list",data);
    setcenterlist(data);
  });
  //End Fetch center from discovery

  }, []);

 

    return (
        <>
        <BannerSectionContainer/>
        {/* {!R.isEmpty(courseProgramData) && courseProgramData.length !== 0 && <CourseandProgram courseProgramData={courseProgramData}/>} */}
        {!R.isEmpty(courseprogramlist) && courseprogramlist.length !== 0 && <CourseandProgram courseProgramData={courseprogramlist}/>}

        {/* <CourseandProgram/> */}
        {!R.isEmpty(schoollist) && schoollist.length !== 0 && <SchoolsList schoolListData={schoollist} />}
        {!R.isEmpty(centerlist) && centerlist.length !== 0 && <CentersList centerListData={centerlist} />}

        {/* <CentersList/> */}
       </>
    );
};

LandingPageContainer.propTypes = {}

export default LandingPageContainer
