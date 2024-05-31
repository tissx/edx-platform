/**
 * Program Detail Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import {useParams } from "react-router-dom";
import Degreeinfo from './Degreeinfo';
import DegreeCourses from './DegreeCourses';
import DegreeFaculty from './DegreeFaculty';
import HowToApply from '../common/HowToApply';
import DegreeFAQ from './DegreeFAQ';
import Loader from '../common/loader';

const DegreeDetailContainer = ({my_discovery_url}) => {
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
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <Degreeinfo programinfo={programdetail.program_info} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <DegreeCourses programinfo={programdetail.program_info} programcourses={programdetail.program_course} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0  && <DegreeFaculty programfaculty={programdetail.instructor} />}
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <HowToApply />}
        {!R.isEmpty(programdetail) && <DegreeFAQ programfaq={programdetail.faq} />}
        
       </>
    );
};

DegreeDetailContainer.propTypes = {}

export default DegreeDetailContainer
// 