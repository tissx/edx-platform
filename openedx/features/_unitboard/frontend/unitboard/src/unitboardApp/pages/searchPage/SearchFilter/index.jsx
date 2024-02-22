
/**
 * Search Filter Page
 */

import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";

// import { useNavigate, Link, useParams } from "react-router-dom";
const SearchFilterContainer = ({my_discovery_url, FiterDetail, getSearchData, Querytxt}) => {


  const [selectedSubject, setselectedSubject] = useState(FiterDetail.selected_subject['subject_uuid']);
  const [selectedProgram, setselectedProgram] = useState(FiterDetail.selected_program['program_group_slug']);
  const [selectedLearningType, setselectedLearningType] = useState(FiterDetail.select_learning_type);
  const [centerList, setcenterList] = useState([]);
  const [FormQuerytxt, setFormQuerytxt] = useState(Querytxt);
  const [selectSchool, setselectSchool] = useState([]);

  
  const onSearchform = (e) => {
    e.preventDefault();

    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let query = document.getElementById('query').value
    let program_group = document.getElementById('program_group').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value

    getSearchData(subject, program_group, learning_type, query, school, center)

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
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value

    getSearchData(val, program_group, learning_type, query, school, center)
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

    getSearchData(subject, val, learning_type, query, school, center)
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

    getSearchData(subject, program_group, val, query, school, center)
  }; 

  const onSchoolChange = (e) => {
    let val = e.target.value;
    setselectSchool(val)
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
    getSearchData(subject, program_group, learning_type, query, val, center)
    
  }; 

  const onCenterChange = (e) => {
    let val = e.target.value;

    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    getSearchData(subject, program_group, learning_type, query, school, val)
    
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
          <div className="row">
            
            <div className="firstROW d-flex pb-2">
                <div className="custom-select">

                    {/* <select className="dropdown-toggle SelectOne {selectedSubject}" id="subject" data-bs-toggle="dropdown" */}
                    <select className={Boolean(selectedSubject)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="subject" data-bs-toggle="dropdown"
                    value={selectedSubject}
                    onChange={(e) => onSubjectChange(e)}
                    >
                      <option className="ColorLight" value="">Subject</option>
                      {FiterDetail.subject_list.map((subjects) => (
                        <option value={subjects['subject_uuid']} >{subjects['subject_name']}</option>
                      ))}
                    </select>
                </div>
                <div className="custom-select mx-3">
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
                <div className="custom-select mx-3">
                    <select className={Boolean(selectSchool.length)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  data-bs-toggle="dropdown"
                    id="school"
                    onChange={(e) => onSchoolChange(e)}
                    >
                      <option className="ColorLight" value="">School</option>
                      {FiterDetail.school_list.map((schools) => (
                        <option value={schools['school_slug']} >{schools['school_name']}</option>
                      ))}
                      <option className="ColorLight" value="independent-center">Independent center</option>
                    </select>
                </div>
                <div className="custom-select mx-3">
                
                    <select className={Boolean(centerList.length)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} data-bs-toggle="dropdown"
                    id="center"
                    onChange={(e) => onCenterChange(e)}
                    >
                      <option className="ColorLight" value="">Center</option>
                      {centerList.map((center) => (
                        <option value={center['center_slug']} >{center['center_name']}</option>
                      ))}
                    </select>
                </div>

                <div className="custom-select mx-3">
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
            </div>

          
          </div>
        </div>
    </section>

  </>

  );
};


SearchFilterContainer.propTypes = {}

export default SearchFilterContainer

