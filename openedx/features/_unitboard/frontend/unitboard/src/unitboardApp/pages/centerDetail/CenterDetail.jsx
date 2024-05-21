
/**
 * Center detail Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import { useNavigate, Link, useParams } from "react-router-dom";
import SearchResultsCourses from './SearchResults/SearchResultsCourses';
import SearchResultsPrograms from './SearchResults/SearchResultsPrograms';
import SearchResultsFaculty from './SearchResults/SearchResultsFaculty';
import Loader from '../common/loader'; 
import CenterFilter from './centerFilter/centerFilter';
import CircularProgress from '@material-ui/core/CircularProgress';

const CenterDetailContainer = ({my_discovery_url}) => {

  const [centerdetail, setcenterdetail] = useState([]);
  const [programdetail, setprogramdetail] = useState([]);
  const [centerLoader, setcenterLoader] = useState();



  const [fiterDetail, setfiterDetail] = useState([]);

  const [filterLoader, setfilterLoader] = useState();
  const [resultLoader, setresultLoader] = useState();

  const [CourseResults, setCourseResults] = useState([]);
  const [ProgramResults, setProgramResults] = useState([]);
  const [FacultyResults, setFacultyResults] = useState([]);


  const { slug } = useParams();





  useEffect(() => {

    const query = new URLSearchParams(window.location.search);

    const program = query.get('program') || ""
    var language = query.get('language') || ""
    const organization = query.get('organization') || ""
    const mode = query.get('mode') || ""



    var center_detail_url = `${my_discovery_url}/api/v1/get-center-from-slug/?slug=${slug}`
    // var program_program_type_url = `${my_discovery_url}/api/v1/get-program-and-type-from-center/?slug=${slug}`

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




    var get_search_filter_url = `${my_discovery_url}/api/v1/center-detail/search-filter/?center=${slug}&program=${program}&language=${language}&organization=${organization}&mode=${mode}`

    //start Fetch filter detail from discovery
    fetch(get_search_filter_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setfiterDetail(data);
        setfilterLoader(true)
        setresultLoader()
        // console.log("center filter data", data)


        var q_program = ""
        var q_language= ""
        var q_organization = ""
        var q_mode = ""
        var q_center = slug

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
        
        
        // Fetch results based on selected filter 
        getSearchResult(q_center, q_program, q_language, q_organization, q_mode)

    });
      // End Fetch filter detail from discovery


  }, []);



  // Start fetch search results 
  const getSearchResult = (center, program, language, organization, mode) => {

    // start Fetch results for courses 
    var course_api_url = `${my_discovery_url}/api/v1/lms-search/get-center-search/?content_type=course&is_show_course=true&course_center=${center}&course_program_uuid=${program}&course_language=${language}&mx_organization=${organization}&course_mode=${mode}`
    // var course_api_url = `${my_discovery_url}/api/v1/lms-search/get-center-search/?content_type=course&course_program_uuid=${program}&course_language=${language}&mx_organization=${organization}&mode=${mode}`
    fetch(course_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setCourseResults(data);
        setresultLoader(true)

    });
    // End Fetch results for courses 


    // start Fetch results for program 
    var program_api_url = `${my_discovery_url}/api/v1/lms-search/get-center-search/?content_type=program&program_center=${center}&program_uuid=${program}&program_language=${language}&mx_program_organization=${organization}&program_mode=${mode}`
    fetch(program_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setProgramResults(data);
        setresultLoader(true)

    });
    // End Fetch results for program 


    // start Fetch results for Faculty 
    var faculty_api_url = `${my_discovery_url}/api/v1/lms-search/get-center-people/?mx_center=${center}&mx_program=${program}&mx_instructor_lang=${language}&mx_instructor_org=${organization}&mx_mode=${mode}`
    fetch(faculty_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setFacultyResults(data);
      setresultLoader(true)

    });
    // End Fetch results for program 


  };
  // End fetch search results 

  // Start Show search results onChange Dropdown 
  function getSearchData(program, language, organization, mode) {
 
    setCourseResults('')
    setProgramResults('')
    // setDegreeResults('')
    setresultLoader()
  
    getSearchResult(slug, program, language, organization, mode)
    }

  // End Show search results onChange Dropdown 


    return (
        <>
        {!(centerLoader) && !(filterLoader) && <Loader/>}
        {!R.isEmpty(centerdetail) && centerdetail.length !== 0 && !R.isEmpty(fiterDetail) && fiterDetail.length !== 0 && <CenterFilter centerInfo={centerdetail.center_info}  FiterDetail={fiterDetail} getSearchData={getSearchData} />} 

        {!(resultLoader) && <CircularProgress className="mx-loader"/>}

        {!R.isEmpty(CourseResults) && CourseResults.length !== 0 &&<SearchResultsCourses CourseResults={CourseResults} />}
        {!R.isEmpty(ProgramResults) && ProgramResults.length !== 0 && <SearchResultsPrograms ProgramResults={ProgramResults} />} 
        {!R.isEmpty(FacultyResults) && FacultyResults.length !== 0 && <SearchResultsFaculty my_discovery_url={my_discovery_url} FacultyResults={FacultyResults} />} 
        
       </>
    );
};

CenterDetailContainer.propTypes = {}

export default CenterDetailContainer
