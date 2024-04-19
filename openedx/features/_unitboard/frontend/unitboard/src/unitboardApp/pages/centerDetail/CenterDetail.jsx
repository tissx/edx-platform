
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
import CenterFilter from './centerFilter/centerFilter';

const CenterDetailContainer = ({my_discovery_url}) => {

  const [centerdetail, setcenterdetail] = useState([]);
  const [programdetail, setprogramdetail] = useState([]);
  const [centerLoader, setcenterLoader] = useState();



  const [fiterDetail, setfiterDetail] = useState([]);

  const [filterLoader, setfilterLoader] = useState();



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




    var get_search_filter_url = `${my_discovery_url}/api/v1/center-detail/search-filter/?center=${slug}`

    //start Fetch filter detail from discovery
    fetch(get_search_filter_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setfiterDetail(data);
        setfilterLoader(true)
        // setresultLoader()
        console.log("center filter data", data)


        // var q_subject = ""
        // var q_prg_group = ""
        // var q_learningtype = "all"
        // var q_school = ""
        // var q_center = ""
        // var selected_language = data.selected_language

        // if((data.selected_subject['subject_uuid'])) {
        //   q_subject = data.selected_subject['subject_uuid']
        // }


        // if((data.selected_program['program_group_slug'])) {
        //   q_prg_group = data.selected_program['program_group_slug']
        // }
        
        
        // if(data.select_learning_type && data.select_learning_type !=="null") {
        //   q_learningtype = data.select_learning_type
        // }
        // if(data.selected_school && data.selected_school !=="null") {
        //   q_school = data.selected_school
        // }

        // if(data.selected_centter && data.selected_centter !=="null") {
        //   q_center = data.select_learning_type
        // }

        // getSearchResult(q_subject, q_prg_group, q_learningtype, query_search, q_school, q_center, selected_language, size)

    });
      // End Fetch filter detail from discovery



    //  //start Fetch Program and program type for Center from discovery
    //  fetch(program_program_type_url)
    //  .then((res) => {
    //      return res.json();
    //  })
    //  .then((data) => {
    //     //  console.log("get program detail",data);
    //     setprogramdetail(data);
    //  });
    // //  //End Fetch Program and program type for Center from discovery


  }, []);
  
    return (
        <>
        {!(centerLoader) && !(filterLoader) && <Loader/>}
        {/* {!R.isEmpty(centerdetail) && centerdetail.length !== 0 && <CenterDetailBanner centerInfo={centerdetail.center_info} />}  */}
        {!R.isEmpty(centerdetail) && centerdetail.length !== 0 && !R.isEmpty(fiterDetail) && fiterDetail.length !== 0 && <CenterFilter centerInfo={centerdetail.center_info}  FiterDetail={fiterDetail} />} 

        
        {!R.isEmpty(centerdetail) && centerdetail.length !== 0 && <CenterCoursesList centerInfo={centerdetail.center_info} centerCourses={centerdetail.courses} />} 
        {!R.isEmpty(programdetail) && programdetail.length !== 0 && <CenterProgramList programList={programdetail} />} 
        {(centerLoader) && !R.isEmpty(centerdetail) && centerdetail.length !== 0 && <CenterFaculty centerFaculty={centerdetail.faculty} />} 
        
    
       </>
    );
};

CenterDetailContainer.propTypes = {}

export default CenterDetailContainer
