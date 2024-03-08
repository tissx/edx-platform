
/**
 * Center detail Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import CenterDetailBanner from './CenterDetailBanner';
import CenterProgramList from './CenterProgramList';
import CenterFaculty from './CenterFaculty';
import { useNavigate, Link, useParams } from "react-router-dom";
import CenterCoursesList from './CenterCoursesList';
import Loader from '../common/loader'; 

const CenterDeatilContainer = ({my_discovery_url}) => {

  const [centerdetail, setcenterdetail] = useState([]);
  const [programdetail, setprogramdetail] = useState([]);
  const [centerLoader, setcenterLoader] = useState();
  const { slug } = useParams();

  useEffect(() => {
    var center_detail_url = `${my_discovery_url}/api/v1/get-center-from-slug/?slug=${slug}`
    var program_program_type_url = `${my_discovery_url}/api/v1/get-program-and-type-from-center/?slug=${slug}`

    //start Fetch center detail from discovery
    fetch(center_detail_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("center detail",data);
        setcenterdetail(data);
        setcenterLoader(true)
    });
    //End Fetch center detail from discovery


    //  //start Fetch Program and program type for Center from discovery
     fetch(program_program_type_url)
     .then((res) => {
         return res.json();
     })
     .then((data) => {
        //  console.log("get program detail",data);
        setprogramdetail(data);
     });
    //  //End Fetch Program and program type for Center from discovery


  }, []);
  
    return (
        <>
        {!(centerLoader) && <Loader/>}
        {!R.isEmpty(centerdetail) && centerdetail.length !== 0 && <CenterDetailBanner centerInfo={centerdetail.center_info} />} 
        {!R.isEmpty(centerdetail) && centerdetail.length !== 0 && <CenterCoursesList centerInfo={centerdetail.center_info} centerCourses={centerdetail.courses} />} 
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <CenterProgramList programList={programdetail} />} 
        {(centerLoader) && !R.isEmpty(centerdetail) && centerdetail.length !== 0 && <CenterFaculty centerFaculty={centerdetail.faculty} />} 
        
    
       </>
    );
};

CenterDeatilContainer.propTypes = {}

export default CenterDeatilContainer
