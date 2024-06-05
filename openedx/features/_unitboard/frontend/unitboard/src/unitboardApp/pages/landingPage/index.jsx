/**
 * Landing Page
 */

import React, { useState, useEffect } from 'react';
import CourseandProgram from './CourseandProgram';
import SchoolCenterList from './SchoolCenterList';
import BannerSectionContainer from './BannerSection';
import * as R from "ramda";
import CircularProgress from '@material-ui/core/CircularProgress';

const LandingPageContainer = ({my_discovery_url}) => {
  const [schoolcenterlist, setschoolcenterlist] = useState([]);
  const [courseprogramlist, setcourseprogramlist] = useState([]);
  const [ProgCourseLoader, setProgCourseLoader] = useState();
  const [SchoolcenterLoader, setSchoolcenterLoader] = useState();


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


    //start Fetch school/center from discovery
    fetch(`${my_discovery_url}/api/v1/get-school-center-list`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setschoolcenterlist(data)
        setSchoolcenterLoader(true)
      });
    //End Fetch school/center from discovery

  }, []);

    return (
        <>
        <BannerSectionContainer/>
        {!(ProgCourseLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(courseprogramlist) && courseprogramlist.length !== 0 && <CourseandProgram courseProgramData={courseprogramlist}/>}
        {!(SchoolcenterLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(schoolcenterlist) && <SchoolCenterList schoolcenterList={schoolcenterlist} />}
       </>
    );
};

LandingPageContainer.propTypes = {}

export default LandingPageContainer
