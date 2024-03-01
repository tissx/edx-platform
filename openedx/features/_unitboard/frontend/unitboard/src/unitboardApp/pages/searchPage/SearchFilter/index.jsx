
/**
 * Search Filter Page
 */

import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as R from "ramda";
// import { useNavigate, Link, useParams } from "react-router-dom";
import $ from 'jquery';


const SearchFilterContainer = ({my_discovery_url, FiterDetail, getSearchData, Querytxt, mxLearningType, onFormSearch}) => {


  const [selectedSubject, setselectedSubject] = useState(FiterDetail.selected_subject['subject_uuid']);
  const [selectedProgram, setselectedProgram] = useState(FiterDetail.selected_program['program_group_slug']);
  const [selectedLearningType, setselectedLearningType] = useState(mxLearningType);
  // const [selectedLearningType, setselectedLearningType] =   useState(FiterDetail.select_learning_type);
  // const [selectedLearningType, setselectedLearningType] =   useState();

  const [selectedLanguage, setselectedLanguage] = useState(FiterDetail.selected_language);
  const [centerList, setcenterList] = useState(FiterDetail.center_list);
  const [FormQuerytxt, setFormQuerytxt] = useState(Querytxt);
  const [selectSchool, setselectSchool] = useState(FiterDetail.selected_school);

  const [selectedCenter, setselectedCenter] = useState(FiterDetail.selected_center);

  
  if(mxLearningType != selectedLearningType){
    setselectedLearningType(mxLearningType)
  }

  
  function UpdateURL(query_param, query_value) {
    const url = new URL(window.location.href);
    url.searchParams.set(query_param, query_value);
    // url.searchParams.delete('param2');
    window.history.replaceState(null, null, url);
  }

  function DeleteURL(query_param) {
    const url = new URL(window.location.href);
    url.searchParams.delete(query_param);
    window.history.replaceState(null, null, url);
  }

  const onSearchform = (e) => {
    e.preventDefault();

    let subject = document.getElementById('subject').value
    let learning_type = "all"
    let query = document.getElementById('query').value
    let program_group = document.getElementById('program_group').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value
    let language = document.getElementById('language').value
    let size = 4
    getSearchData(subject, program_group, learning_type, query, school, center, language, size)

    onFormSearch()
    setselectedLearningType('all')
    

    UpdateURL('query', query)
  }; 
  
 
//IT triggers by pressing the enter key
const handleKeypress = e => {
  if (e.keyCode === 13) {
  e.preventDefault();

  onSearchform(e);

  }
};



  const onSubjectChange = (e) => {
    let val = e.target.value;
    e.preventDefault();
    setselectedSubject(val)
    // let sub_slug = e.target.attr('sub_slug')
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value
    let language = document.getElementById('language').value

    getSearchData(val, program_group, learning_type, query, school, center, language)

    var sub_slug =  $("#subject option:selected").attr("sub-slug");

    // const url = new URL(window.location.href);
    // url.searchParams.set('subject', sub_slug);
    // // url.searchParams.delete('param2');
    // window.history.replaceState(null, null, url);
    UpdateURL('subject', sub_slug)


  }; 

  const onProgramChange = (e) => {
    let val = e.target.value;
    e.preventDefault();
    setselectedProgram(val)

    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value
    let language = document.getElementById('language').value

    getSearchData(subject, val, learning_type, query, school, center, language)
    
    // Update Url 
    UpdateURL('program_degree_group', val)

  
  }; 

  const onLearningTypeChange = (e) => {
    let val = e.target.value;
    e.preventDefault();
    setselectedLearningType(val)
    
    let subject = document.getElementById('subject').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value
    let language = document.getElementById('language').value

    getSearchData(subject, program_group, val, query, school, center, language)
  }; 

  const onSchoolChange = (e) => {
    let val = e.target.value;
    setselectSchool(val)
    setcenterList([])
    setselectedCenter()
    //start Fetch Center List from discovery
    var get_center_from_school_url = `${my_discovery_url}/api/v1/lms-search/get-center-from-school/?school=${val}`

     fetch(get_center_from_school_url)
     .then((res) => {
         return res.json();
     })
     .then((data) => {
        //  console.log("Center from school",data);
         setcenterList(data);
     });
     //End Fetch Center List from discovery

     setselectSchool(val)

    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let center = ""
    //  alert(subject)
    let language = document.getElementById('language').value
    UpdateURL('school', val)
    UpdateURL('center', center)

    getSearchData(subject, program_group, learning_type, query, val, center, language)
    
    
    // DeleteURL('center')

  }; 

  const onCenterChange = (e) => {
    let val = e.target.value;
    setselectedCenter(val)
    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let language = document.getElementById('language').value

    getSearchData(subject, program_group, learning_type, query, school, val, language)
    UpdateURL('center', val)
    
  };
  

  const onLanguageChange = (e) => {
    let language = e.target.value;
    setselectedLanguage(language)
    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value
    getSearchData(subject, program_group, learning_type, query, school, center, language)
   
    UpdateURL('language', language)
    
  };


  
  return(
  <>
    
    <section className="search-bgimg" id="prg-page">
      <div className="container listing-container">
        <div className="row">
            <div className="col-md-7 col-sm-12 f-cell">
                <h2 className="text-white"><b>Search Our Catalog</b></h2>
                <form id="formDATA"> 
                    <input type="search" id="query" name="q" 
                    value={FormQuerytxt}
                    onChange={(e) =>setFormQuerytxt(e.target.value)}
                    onKeyDown={(e) =>handleKeypress(e)}
                    placeholder="What do you want to Learn?"/>
                    <button className="searchBtn" type="button"
                    onClick={(e) => onSearchform(e)}
                    >Search</button>
                </form>
            </div>
            <div className="offset-md-5">
                
            </div>
        </div>
      </div>
  </section>
    
    
    <section className="bglight p-2" id="firstSection">
        <div className="container listing-container">
            <h1 className="theading-title">Filter</h1> 
          <div className="row row-cols-6 pb-3">
            
            {/* First row for filter dropdown start */}
            {/* <div className="firstROW d-flex pb-2"> */}
                <div className="custom-select">

                    {/* <select className="dropdown-toggle SelectOne {selectedSubject}" id="subject" data-bs-toggle="dropdown" */}
                    <select className={Boolean(selectedSubject)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="subject" data-bs-toggle="dropdown"
                    value={selectedSubject}
                    onChange={(e) => onSubjectChange(e)}
                    >
                      <option className="ColorLight" value="">Subject</option>
                      {FiterDetail.subject_list.map((subjects) => (
                        <option sub-slug={subjects['subject_slug']} value={subjects['subject_uuid']} >{subjects['subject_name']}</option>
                      ))}
                    </select>
                </div>
                <div className="custom-select">
                    <select className={Boolean(selectedProgram)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="program_group" data-bs-toggle="dropdown"
                    value={selectedProgram}
                    onChange={(e) => onProgramChange(e)}
                    >
                      <option className="ColorLight" value="">Program</option>
                      {FiterDetail.program_group_list.map((programs) => (
                        <option value={programs['program_group_slug']} >{programs['program_group_name']}</option>
                      ))}
                    </select>
                </div>
                <div className="custom-select ">
                    <select className={Boolean(selectSchool.length)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  data-bs-toggle="dropdown"
                    id="school"
                    value={selectSchool}
                    onChange={(e) => onSchoolChange(e)}
                    >
                      <option className="ColorLight" value="">School</option>
                      {FiterDetail.school_list.map((schools) => (
                        <option value={schools['school_slug']} >{schools['school_name']}</option>
                      ))}
                      <option className="ColorLight" value="independent-center">Independent center</option>
                    </select>
                </div>
                
                <div className="custom-select ">
                
                    <select className={Boolean(centerList.length)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} data-bs-toggle="dropdown"
                    id="center"
                    value={selectedCenter}
                    onChange={(e) => onCenterChange(e)}
                    >
                      <option className="ColorLight" value="">Center</option>
                      {centerList.map((center) => (
                        <option value={center['center_slug']} >{center['center_name']}</option>
                      ))}
                    </select>
                </div>

            {/* </div>
            {/* First row for filter dropdown End */}

            {/* 2nd row for filter dropdown Start */}
            {/* <div className="firstROW d-flex pb-3 py-2"> */} 
              

                <div className="custom-select">
                    <select className="dropdown-toggle SelectOne" id="language" data-bs-toggle="dropdown"
                    value={selectedLanguage}
                    onChange={(e) => onLanguageChange(e)}
                    >
                      <option className="ColorLight" value="all">Language</option>
                      {FiterDetail.language_list.map((language) => (
                        <option value={language['0']} >{language['1']}</option>
                      ))}
                    </select>
                </div>

                <div className="custom-select ">
                    <select className={Boolean(selectedLearningType)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="learning_type" data-bs-toggle="dropdown"
                    value={selectedLearningType}
                    onChange={(e) => onLearningTypeChange(e)}
                    >
                      <option className="ColorLight" value="all">Learning type</option>
                        <option value="course">Course</option>
                        <option value="program">Program</option>
                        <option value="degree">Degree</option>
                        <option value="program-degree">Program & Degree</option>
                    </select>
                </div>
            {/* </div> */}
            {/* 2nd row for filter dropdown Start */}


          
          </div>
        </div>
    </section>

  </>

  );
};


SearchFilterContainer.propTypes = {}

export default SearchFilterContainer

