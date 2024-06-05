/**
 * Program Detail Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import { useParams } from "react-router-dom";
import ProgramInfo from './ProgramInfo';
import ProgramCourses from './ProgramCourses';
import ProgramFaculty from './ProgramFaculty';
import HowToApply from '../common/HowToApply';
import ProgramFAQ from './ProgramFAQ';
import Loader from '../common/loader';

const ProgramDetailContainer = ({my_discovery_url}) => {
  const [programdetail, setprogramdetail] = useState([]);
  const [programLoader, setprogramLoader] = useState();
  const { slug } = useParams();

  useEffect(() => {
    
  //start Fetch program detail from discovery
    fetch(`${my_discovery_url}/api/v1/get-program-from-slug/?program_uuid=${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log("program course detail",data);
    setprogramdetail(data);
    setprogramLoader(true)
    });
  //End Fetch program detail from discovery


  }, []);

    return (
        <>
        {!(programLoader) && <Loader/>}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramInfo programinfo={programdetail.program_info} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramCourses programinfo={programdetail.program_info} programcourses={programdetail.program_course} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0  && <ProgramFaculty programfaculty={programdetail.instructor} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <HowToApply />}
        {!R.isEmpty(programdetail) && <ProgramFAQ programfaq={programdetail.faq} />}
    
       </>
    );
};

ProgramDetailContainer.propTypes = {}

export default ProgramDetailContainer
// 