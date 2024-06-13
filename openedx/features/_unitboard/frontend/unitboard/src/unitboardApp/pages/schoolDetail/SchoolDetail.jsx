
/**
 * Center detail Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import { useParams } from "react-router-dom";
import SearchResultsCourses from './SearchResults/SearchResultsCourses';
import SearchResultsPrograms from './SearchResults/SearchResultsPrograms';
import Loader from '../common/loader'; 
import SchoolFilter from './SchoolFilter/schoolFilter';
import CircularProgress from '@material-ui/core/CircularProgress';

const SchoolDeatilContainer = ({my_discovery_url}) => {
  const [schooldetail, setschooldetail] = useState([]);
  const [schoolLoader, setschoolLoader] = useState();
  const [fiterDetail, setfiterDetail] = useState([]);
  const [filterLoader, setfilterLoader] = useState();
  const [resultLoader, setresultLoader] = useState();
  const [CourseResults, setCourseResults] = useState([]);
  const [ProgramResults, setProgramResults] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const program = query.get('program') || ""
    var language = query.get('language') || ""
    const organization = query.get('organization') || ""
    const mode = query.get('mode') || ""
    const subject = query.get('subject') || ""
    const course_recog = query.get('course_recognition') || ""
    const course_state = query.get('course_state') || ""

    //start Fetch center detail from discovery
    fetch(`${my_discovery_url}/api/v1/get-school-from-slug/?slug=${slug}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("center detail",data);
        setschooldetail(data);
        setschoolLoader(true)
    });
    //End Fetch center detail from discovery


    //start Fetch filter detail from discovery
    fetch(`${my_discovery_url}/api/v1/school-detail/search-filter/?school=${slug}&program=${program}&language=${language}&organization=${organization}&mode=${mode}&subject=${subject}&course_recog=${course_recog}&course_state=${course_state}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setfiterDetail(data);
        setfilterLoader(true)
        setresultLoader()
        var q_program = ""
        var q_language= ""
        var q_organization = ""
        var q_mode = ""
        var q_subject = ""
        var q_course_recog = ""
        var q_course_state = ""
        var q_school = slug

        if((data.selected_program["program_uuid"])) {
          q_program = data.selected_program["program_uuid"]
        }

        if((data.selected_organization['organization_key_lower'])) {
          q_organization = data.selected_organization['organization_key_lower']
        }

        if((data.selected_language["language_slug"])) {
          q_language = data.selected_language["language_slug"]
        }

        if((data.selected_mode['mode_slug'])) {
          q_mode = data.selected_mode['mode_slug']
        }

        if((data.selected_subject['subject_uuid'])) {
          q_subject = data.selected_subject['subject_uuid']
        }

        if(data.selected_course_recog && data.selected_course_recog !=="null") {
          q_course_recog = data.selected_course_recog
        }

        if(data.selected_course_state && data.selected_course_state !=="null") {
          q_course_state = data.selected_course_state
        }
        
        // Fetch results based on selected filter 
        getSearchResult(q_school, q_program, q_language, q_organization, q_mode, q_subject, q_course_recog, q_course_state)

    });
      // End Fetch filter detail from discovery

  }, []);


  // Start fetch search results 
  const getSearchResult = (school, program, language, organization, mode, subject, course_recog, course_state) => {

    // start Fetch results for courses 
    fetch(`${my_discovery_url}/api/v1/lms-search/get-school-search/?content_type=course&course_school=${school}&course_program_uuid=${program}&course_language=${language}&mx_organization=${organization}&course_mode=${mode}&subject_uuids=${subject}&course_recognition=${course_recog}&course_state=${course_state}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setCourseResults(data);
        setresultLoader(true)

    });
    // End Fetch results for courses 


    // start Fetch results for program 
    fetch(`${my_discovery_url}/api/v1/lms-search/get-school-search/?content_type=program&program_school=${school}&program_uuid=${program}&program_language=${language}&mx_program_organization=${organization}&program_mode=${mode}&subject_uuids=${subject}&program_course_recog=${course_recog}&program_course_state=${course_state}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setProgramResults(data);
        setresultLoader(true)

    });
    // End Fetch results for program 


  };
  // End fetch search results 

  // Start Show search results onChange Dropdown 
  const getSearchData = (program, language, organization, mode, subject, course_recog, course_state) => {
    setCourseResults('')
    setProgramResults('')
    setresultLoader()
    getSearchResult(slug, program, language, organization, mode, subject, course_recog, course_state)
    }

  // End Show search results onChange Dropdown 

    return (
        <>
        {!(schoolLoader) && !(filterLoader) && <Loader/>}
        {!R.isEmpty(schooldetail) && schooldetail.length !== 0 && !R.isEmpty(fiterDetail) && fiterDetail.length !== 0 && <SchoolFilter schoolInfo={schooldetail.school_info}  FiterDetail={fiterDetail} getSearchData={getSearchData} />} 
        {!(resultLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(CourseResults) && CourseResults.length !== 0 &&<SearchResultsCourses CourseResults={CourseResults} />}
        {!R.isEmpty(ProgramResults) && ProgramResults.length !== 0 && <SearchResultsPrograms ProgramResults={ProgramResults} />} 
       </>
    );
};

SchoolDeatilContainer.propTypes = {}

export default SchoolDeatilContainer
