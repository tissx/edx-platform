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

  useEffect(() => {
    
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

  // const courseProgramData = useSelector(state => state.courseProgramDegree);

// console.log("courseProgramDatacourseProgramData", courseProgramData)
  //   const courseProgramData= {
  //     "courses": [
  //         {
  //             "course_name": "MX Course 001",
  //             "short_description": "null",
  //             "course_image": "http://local.overhang.io:8000/asset-v1:Manprax+mx_course_001+2023_001+type@asset+block@images_course_image.jpg",
  //             "course_id": "course-v1:Manprax+mx_course_001+2023_001"
  //         },
  //         {
  //             "course_name": "MX Course 002",
  //             "short_description": "null",
  //             "course_image": "http://local.overhang.io:8000/asset-v1:Manprax+mx_course_002+2023_002+type@asset+block@images_course_image.jpg",
  //             "course_id": "course-v1:Manprax+mx_course_002+2023_002"
  //         }
  //     ]
  // }

    return (
        <>
        <BannerSectionContainer/>
        {/* {!R.isEmpty(courseProgramData) && courseProgramData.length !== 0 && <CourseandProgram courseProgramData={courseProgramData}/>} */}

        <CourseandProgram/>
        {!R.isEmpty(schoollist) && schoollist.length !== 0 && <SchoolsList schoolListData={schoollist} />}
        {!R.isEmpty(centerlist) && centerlist.length !== 0 && <CentersList centerListData={centerlist} />}

        {/* <CentersList/> */}
       </>
    );
};

LandingPageContainer.propTypes = {}

export default LandingPageContainer
