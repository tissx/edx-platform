/**
 * Program Detail Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";
import { useNavigate, Link, useParams } from "react-router-dom";
import ProgramInfo from './ProgramInfo';
import ProgramCourses from './ProgramCourses';
import ProgramFaculty from './ProgramFaculty';
import HowToApply from '../common/HowToApply';
import ProgramFAQ from './ProgramFAQ';

const ProgramDetailContainer = ({my_discovery_url}) => {

  const [programdetail, setprogramdetail] = useState([]);
  const { slug } = useParams();


  useEffect(() => {
    
 
var program_detail_url = `${my_discovery_url}/api/v1/get-program-from-slug/?program_uuid=${slug}`

//start Fetch program detail from discovery
  fetch(program_detail_url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log("program course detail",data);
  setprogramdetail(data);
  });
//End Fetch program detail from discovery


  }, []);

    return (
        <>
        {/* <ProgramInfo/> */}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramInfo programinfo={programdetail.program_info} />}
        
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramCourses programinfo={programdetail.program_info} programcourses={programdetail.program_course} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramFaculty programfaculty={programdetail.instructor} />}
        
        {/* <ProgramCourses/> */}
        {/* <ProgramFaculty/> */}
        <HowToApply/>
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramFAQ programfaq={programdetail.faq} />}
        
        
        {/* <ProgramFAQ/> */}
        {/* <CourseandProgram/> */}
        {/* {!R.isEmpty(schoollist) && schoollist.length !== 0 && <SchoolsList schoolListData={schoollist} />} */}

       </>
    );
};

ProgramDetailContainer.propTypes = {}

export default ProgramDetailContainer
// 