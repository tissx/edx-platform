
/**
 * Search Page
 */

import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";

// import { useNavigate, Link, useParams } from "react-router-dom";
import SearchFilter from './SearchFilter';
import SearchResultsCourses from './SearchResultsCourses';
import SearchResultsPrograms from './SearchResultsPrograms';
import SearchResultsDegrees from './SearchResultsDegrees';
import Loader from '../common/loader';
import CircularProgress from '@material-ui/core/CircularProgress';

import SectionResultsCourses from './SectionWiseCourseResults';
import SectionResultsProgram from './SectionWiseProgramResults';
import SectionResultsDegree from './SectionWiseDegreeResults';
import $ from 'jquery';

const SearchPageContainer = ({my_discovery_url}) => {

    
  const [fiterDetail, setfiterDetail] = useState([]);
  const [CourseResults, setCourseResults] = useState([]);
  const [ProgramResults, setProgramResults] = useState([]);
  const [DegreeResults, setDegreeResults] = useState([]);
  const [Querytxt, setQuerytxt] = useState([]);

  const [CourseApiURL, setCourseApiURL] = useState([]);
  const [ProgramApiURL, setProgramApiURL] = useState([]);
  const [DregeeApiURL, setDregeeApiURL] = useState([]);

  const [filterLoader, setfilterLoader] = useState();
  const [resultLoader, setresultLoader] = useState();

  const [showSectionResults, setshowSectionResults] = useState();

  const [mxLearningType, setmxLearningType] = useState('all');

  var size = 0

 
  
  
  const getSearchResult = (subject, program_degree_group, learningType, query, school, center, language, size) => {
   
    // if(school == "independent-center") {
    //   school = ""
    // }
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
    var course_api_url = `${my_discovery_url}/api/v1/lms-search/get-search/?content_type=course&is_show_course=true${course_type_query}&q=${query}&course_school=${school}&course_center=${center}&course_language=${language}&size=${size}`
    fetch(course_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        
        setCourseResults(data);
        setmxLearningType(learningType)
        setQuerytxt(query)
        setresultLoader(true)

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
    var program_api_url = `${my_discovery_url}/api/v1/lms-search/get-search/?program_or_degree=program${program_type_query}&q=${query}&program_school=${school}&program_center=${center}&program_language=${language}&size=${size}`
    fetch(program_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setProgramResults(data);
        setmxLearningType(learningType)

        setQuerytxt(query)
        setresultLoader(true)
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
    
    var degree_api_url = `${my_discovery_url}/api/v1/lms-search/get-search/?program_or_degree=degree${degree_type_query}&q=${query}&program_school=${school}&program_center=${center}&program_language=${language}&size=${size}`
    fetch(degree_api_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("search results",data);
        setDegreeResults(data);
        setmxLearningType(learningType)
        setQuerytxt(query)
        setresultLoader(true)


    });
    setDregeeApiURL(degree_api_url)
  }
    //End Fetch search results for Degree from discovery


  };


 function getSearchData(subject, program_group, learning_type, query="", school, center, language, size= 0) {
 
  setCourseResults('')
  setProgramResults('')
  setDegreeResults('')
  setresultLoader()

  getSearchResult(subject, program_group, learning_type, query, school, center, language, size)

  }


  //Start On page Load 
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const subject = query.get('subject')
    const program_degree_group = query.get('program_degree_group')
    const learning_type = query.get('learning_type')
    const school = query.get('school') || ""
    const center = query.get('center') || ""
    var language = query.get('language') || ""
    var query_search = query.get('query') || ""
    var is_search = query.get('is_search') || false



    if(is_search && is_search=="true") {
        setshowSectionResults(true)
        size = 4
    }


    var get_search_filter_url = `${my_discovery_url}/api/v1/lms-discovery-search-filter/?subject=${subject}&program_degree_group=${program_degree_group}&learning_type=${learning_type}&school=${school}&center=${center}&language=${language}`

    //start Fetch filter detail from discovery
    fetch(get_search_filter_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setQuerytxt(query_search)
        setfiterDetail(data);
        setfilterLoader(true)
        setresultLoader()


        var q_subject = ""
        var q_prg_group = ""
        var q_learningtype = "all"
        var q_school = ""
        var q_center = ""
        var selected_language = data.selected_language

        if((data.selected_subject['subject_uuid'])) {
          q_subject = data.selected_subject['subject_uuid']
        }


        if((data.selected_program['program_group_slug'])) {
          q_prg_group = data.selected_program['program_group_slug']
        }
        
        
        if(data.select_learning_type && data.select_learning_type !=="null") {
          q_learningtype = data.select_learning_type
        }
        if(data.selected_school && data.selected_school !=="null") {
          q_school = data.selected_school
        }

        if(data.selected_center && data.selected_center !=="null") {
          q_center = data.selected_center
        }

        getSearchResult(q_subject, q_prg_group, q_learningtype, query_search, q_school, q_center, selected_language, size)

    });
    //End Fetch filter detail from discovery


  }, []);

  //End On page Load 
  

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



  // When User click on show more detail 

    function showMoreDetail(subject, program_group, learning_type, learning_type_text, query="", school, center, language) {
 
      setCourseResults('')
      setProgramResults('')
      setDegreeResults('')
      setresultLoader()

      size = 0
      getSearchResult(subject, program_group, learning_type, query, school, center, language, size)
      setshowSectionResults(false)

      // show selected filter as text for learning type 

      if(learning_type && learning_type!== undefined) {

        // Remove if we are already showing selected text as Learning type 
        if($("#show_learningtype_as_text").length > 0) {
          document.getElementById("show_learningtype_as_text").remove();
        }

        // Show learning type as selected text 
        var show_text = '<div class="dropdown fi-border selected-filter-text" id="show_learningtype_as_text">'
                          +'<button class="dropbtn">'+learning_type_text
                          +'<span id="clearSelection" selected-filter-name="learning_type" selected-filter-abbr="show_learningtype_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                          +'</div>';
      
        $("#selected-filter").append(show_text);
        var show_clear_btn = '<div class="clear-all-filter" id="clear-all-filter">clear all</div>';
        $("#show-clear-btn").html(show_clear_btn);

        // Update URL 
        const url = new URL(window.location.href);
        url.searchParams.set("learning_type", learning_type);
        window.history.replaceState(null, null, url);

      }

      }


      function onFormSearch()
      {
      setshowSectionResults(true)
      setresultLoader()

      }

    return (
        <>

        {!(filterLoader) && <Loader/>}
        {!R.isEmpty(fiterDetail) && fiterDetail.length !== 0 &&<SearchFilter  my_discovery_url={my_discovery_url} FiterDetail={fiterDetail} getSearchData={getSearchData} Querytxt={Querytxt} mxLearningType={mxLearningType} onFormSearch={onFormSearch}/>}
       
        {!(resultLoader) && <CircularProgress className="mx-loader"/>}


        {(!(showSectionResults))? 
        (<>
        {!R.isEmpty(CourseResults) && CourseResults.length !== 0 &&<SearchResultsCourses CourseResults={CourseResults} Querytxt={Querytxt} getCoursePaginationData={getCoursePaginationData}/>}
        {!R.isEmpty(ProgramResults) && ProgramResults.length !== 0 &&<SearchResultsPrograms ProgramResults={ProgramResults} Querytxt={Querytxt} getProgramPaginationData={getProgramPaginationData}/>}
        {!R.isEmpty(DegreeResults) && DegreeResults.length !== 0 &&<SearchResultsDegrees DegreeResults={DegreeResults} Querytxt={Querytxt} getDegreePaginationData={getDegreePaginationData}/>}
        </>)
        :(
        <>
        {!R.isEmpty(CourseResults) && CourseResults.length !== 0 &&<SectionResultsCourses CourseResults={CourseResults} Querytxt={Querytxt} showMoreDetail={showMoreDetail}/>}
        {!R.isEmpty(ProgramResults) && ProgramResults.length !== 0 &&<SectionResultsProgram ProgramResults={ProgramResults} Querytxt={Querytxt} showMoreDetail={showMoreDetail}/>}
        {!R.isEmpty(DegreeResults) && DegreeResults.length !== 0 &&<SectionResultsDegree DegreeResults={DegreeResults} Querytxt={Querytxt} showMoreDetail={showMoreDetail}/>}
        
        
        </>)
        }
        

        

        </>
        );
};

SearchPageContainer.propTypes = {}

export default SearchPageContainer
