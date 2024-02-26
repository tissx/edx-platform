/**
 * Landing Page
 */

import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import CourseandProgram from './CourseandProgram';
import SchoolsList from './SchoolsList';
import CentersList from './CentersList';
import BannerSectionContainer from './BannerSection';
import * as R from "ramda";
// import Loader from '../common/loader';
import CircularProgress from '@material-ui/core/CircularProgress';


const LandingPageContainer = ({my_discovery_url}) => {

  const [schoollist, setschoollist] = useState([]);
  const [centerlist, setcenterlist] = useState([]);
  const [courseprogramlist, setcourseprogramlist] = useState([]);

  const [ProgCourseLoader, setProgCourseLoader] = useState();
  const [SchoolLoader, setSchoolLoader] = useState();
  const [CenterLoader, setCenterLoader] = useState();

  useEffect(() => {
    
//start Fetch course, program and degree from discovery
fetch(`${my_discovery_url}/api/v1/lms-course-program-list`)
.then((res) => {
  return res.json();
})
.then((data) => {
  setcourseprogramlist(data);
  setProgCourseLoader(true)
});
//End Fetch course, program and degree from discovery

    // console.log("courseProgramData", courseprogramlist.courses)
   


  //start Fetch school from discovery
    fetch(`${my_discovery_url}/api/v1/lms-school-list`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("school list",data);
        setschoollist(data);
        setSchoolLoader(true)
      });
  //End Fetch school from discovery

  //start Fetch center from discovery
  fetch(`${my_discovery_url}/api/v1/lms-center-list`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log("center list",data);
    setcenterlist(data);
    setCenterLoader(true)
  });
  //End Fetch center from discovery

  }, []);

 

    return (
        <>
        <BannerSectionContainer/>
        {!(ProgCourseLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(courseprogramlist) && courseprogramlist.length !== 0 && <CourseandProgram courseProgramData={courseprogramlist}/>}
        
        {!(SchoolLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(schoollist) && schoollist.length !== 0 && <SchoolsList schoolListData={schoollist} />}
        
        {!(CenterLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(centerlist) && centerlist.length !== 0 && <CentersList centerListData={centerlist} />}

       </>
    );
};

LandingPageContainer.propTypes = {}

export default LandingPageContainer
