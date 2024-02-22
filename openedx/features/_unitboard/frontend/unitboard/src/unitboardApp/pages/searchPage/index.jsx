
/**
 * Search Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";

import { useNavigate, Link, useParams } from "react-router-dom";
import SearchFilter from './SearchFilter';
import SearchResultsCourses from './SearchResultsCourses';
import SearchResultsPrograms from './SearchResultsPrograms';
import SearchResultsDegrees from './SearchResultsDegrees';

const SearchPageContainer = ({my_discovery_url}) => {

    
  const [fiterDetail, setfiterDetail] = useState([]);
  const [CourseResults, setCourseResults] = useState([]);
  const [ProgramResults, setProgramResults] = useState([]);
  const [DegreeResults, setDegreeResults] = useState([]);
  const [Querytxt, setQuerytxt] = useState([]);

  const [CourseApiURL, setCourseApiURL] = useState([]);
  const [ProgramApiURL, setProgramApiURL] = useState([]);
  const [DregeeApiURL, setDregeeApiURL] = useState([]);

  
  

  const getSearchResult = (subject, program_degree_group, learningType, query, school, center) => {

    if(school == "independent-center") {
      school = ""
    }
    //start Fetch search results for courses from discovery
    if(learningType &&  learningType !== undefined && (learningType == "course" || learningType == "all")){
      let course_type_query = ""
    if(program_degree_group &&  program_degree_group !== undefined ) {
      course_type_query = '&course_program_type_slug=' + program_degree_group
    }
    if(subject &&  subject!== undefined ) {
      course_type_query = '&subject_uuids=' + subject
    }

    if(subject && subject!== undefined && program_degree_group && program_degree_group !== undefined) {
      course_type_query = '&subject_uuids=' + subject + '&course_program_type_slug=' + program_degree_group
    }
    var course_api_url = `${my_discovery_url}/api/v1/lms-search/get-search/?content_type=course${course_type_query}&q=${query}&course_school=${school}&course_center=${center}`
    fetch(course_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("search results for course",data);
        setCourseResults(data);
        setQuerytxt(query)

    });
    setCourseApiURL(course_api_url)

  }
    //End Fetch search results for courses from discovery


  //start Fetch search results for Program from discovery
  if(learningType &&  learningType !== undefined && (learningType == "program" || learningType == "all" || learningType == "program-degree")){
    let program_type_query = ""
    
    if(program_degree_group &&  program_degree_group !== undefined ) {
      program_type_query = '&program_type_slug=' + program_degree_group
    }

    if(subject &&  subject !== undefined ) {
      program_type_query = '&subject_uuids=' + subject
    
    }

    if(subject && subject!== undefined && program_degree_group && program_degree_group !== undefined) {
      program_type_query = '&subject_uuids=' + subject + '&program_type_slug=' + program_degree_group
    }
    var program_api_url = `${my_discovery_url}/api/v1/lms-search/get-search/?program_or_degree=program${program_type_query}&q=${query}&program_school=${school}&program_center=${center}`
    fetch(program_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setProgramResults(data);
        setQuerytxt(query)
    });
    setProgramApiURL(program_api_url)

  }
    //End Fetch search results for Program from discovery

  //start Fetch search results for Degree from discovery
  if(learningType && learningType !== undefined && (learningType == "degree" || learningType == "all" || learningType == "program-degree") ){

    let degree_type_query = ""

    if(program_degree_group &&  program_degree_group !== undefined ) {
      degree_type_query = '&program_type_slug=' + program_degree_group
    }

    if(subject &&  subject !== undefined ) {
      degree_type_query = '&subject_uuids=' + subject
    
    }

    if(subject && subject!== undefined && program_degree_group && program_degree_group !== undefined) {
      degree_type_query = '&subject_uuids=' + subject + '&program_type_slug=' + program_degree_group
    }
    
    var degree_api_url = `${my_discovery_url}/api/v1/lms-search/get-search/?program_or_degree=degree${degree_type_query}&q=${query}&program_school=${school}&program_center=${center}`
    fetch(degree_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("search results",data);
        setDegreeResults(data);
        setQuerytxt(query)

    });
    setDregeeApiURL(degree_api_url)
  }
    //End Fetch search results for Degree from discovery

  };


 function getSearchData(subject, program_group, learning_type, query="", school, center) {
 
  setCourseResults('')
  setProgramResults('')
  setDegreeResults('')

  getSearchResult(subject, program_group, learning_type, query, school, center)

  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const subject = query.get('subject')
    const program_degree_group = query.get('program_degree_group')
    const learning_type = query.get('learning_type')
    var query_search = query.get('query')
// alert(learning_type)
    var get_search_filter_url = `${my_discovery_url}/api/v1/lms-discovery-search-filter/?subject=${subject}&program_degree_group=${program_degree_group}&learning_type=${learning_type}`

    //start Fetch filter detail from discovery
    fetch(get_search_filter_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("Filter detail",data);
        if(!(query_search)) {
          query_search = ""
        }
        setQuerytxt(query_search)
        setfiterDetail(data);
        // console.log("search query", query_search)
        

        var q_subject = ""
        var q_prg_group = ""
        var q_learningtype = "all"
        var school = ""
        var center = ""

        if((data.selected_subject['subject_uuid'])) {
          q_subject = data.selected_subject['subject_uuid']
        }


        if((data.selected_program['program_group_slug'])) {
          q_prg_group = data.selected_program['program_group_slug']
        }
        
        if(data.select_learning_type && data.select_learning_type !=="null") {
          q_learningtype = data.select_learning_type
        // alert(q_learningtype)

        }


        getSearchResult(q_subject, q_prg_group, q_learningtype, query_search, school, center)

    });
    //End Fetch filter detail from discovery


  }, []);
  

  //Start Pagination 



  // Start Get Course Pagination Result 
  function getCoursePaginationData(page){
    let course_pagination_url = CourseApiURL+'&page='+page
    fetch(course_pagination_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setCourseResults(data);

    });
  }
  // End Get Course Pagination Result 

  // Start Get Program Pagination Result 
  function getProgramPaginationData(page){
    let program_pagination_url = ProgramApiURL+'&page='+page
    fetch(program_pagination_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setProgramResults(data);

    });
  }
  // End Get Program Pagination Result 

  // Start Get Degree Pagination Result 
  function getDegreePaginationData(page){
    let degree_pagination_url = DregeeApiURL+'&page='+page
    fetch(degree_pagination_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setDegreeResults(data);

    });
  }
  // End Get Degree Pagination Result 
  
  //End Pagination 



    return (
        <>

        {!R.isEmpty(fiterDetail) && fiterDetail.length !== 0 &&<SearchFilter  my_discovery_url={my_discovery_url} FiterDetail={fiterDetail} getSearchData={getSearchData} Querytxt={Querytxt}/>}
        {!R.isEmpty(CourseResults) && CourseResults.length !== 0 &&<SearchResultsCourses CourseResults={CourseResults} Querytxt={Querytxt} getCoursePaginationData={getCoursePaginationData}/>}
        {!R.isEmpty(ProgramResults) && ProgramResults.length !== 0 &&<SearchResultsPrograms ProgramResults={ProgramResults} Querytxt={Querytxt} getProgramPaginationData={getProgramPaginationData}/>}
        {!R.isEmpty(DegreeResults) && DegreeResults.length !== 0 &&<SearchResultsDegrees DegreeResults={DegreeResults} Querytxt={Querytxt} getDegreePaginationData={getDegreePaginationData}/>}
 
        </>
        );
};

SearchPageContainer.propTypes = {}

export default SearchPageContainer
