
/**
 * Search Filter Page
 */

import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import * as R from "ramda";

const SearchFilterContainer = ({my_discovery_url, FiterDetail, getSearchData, Querytxt, mxLearningType, onFormSearch}) => {
  const [selectedSubject, setselectedSubject] = useState(FiterDetail.selected_subject['subject_uuid']);
  const [offeringTypeList, setofferingTypeList] = useState(FiterDetail.program_group_list);
  const [selectedProgram, setselectedProgram] = useState(FiterDetail.selected_program['program_group_slug']);
  const [selectedLearningType, setselectedLearningType] = useState(mxLearningType);
  const [selectedLanguage, setselectedLanguage] = useState(FiterDetail.selected_language);
  // const [centerList, setcenterList] = useState(FiterDetail.center_list);
  const [FormQuerytxt, setFormQuerytxt] = useState(Querytxt);
  const [selectSchool, setselectSchool] = useState(FiterDetail.selected_school);
  const [selectedCenter, setselectedCenter] = useState(FiterDetail.selected_center);
  const [selectedCourseRecog, setselectedCourseRecog] = useState(FiterDetail.selected_course_recog);
  const [selectedCourseState, setselectedCourseState] = useState(FiterDetail.selected_course_state);
  
  
  if(mxLearningType !== selectedLearningType){
    setselectedLearningType(mxLearningType)
  }

  const query = new URLSearchParams(window.location.search);
  // var is_search = query.get('is_search') || false
  // var is_section = query.get('is_section') || "true"


  const mx_offering = {
    "all": "Offering",
    "course": "Courses",
    "program": "Programs",
    "degree": "Degrees",
    // "program-degree": "Program & Degrees",
  }

  const mx_course_state = {
    "": "Courses State",
    "upcoming": "Upcoming Courses",
    "current": "Current Courses",
    "archived": "Archived Courses",
    "oer": "OERs",
  }

  const mx_offering_type_msg = {
    "": "Offering type",
    "all": "Offering type",
    "course": "Offering type",
    "program": "Programs offering",
    "degree": "Degrees offering",
    "program-degree": "Offering type",
  }
  
    const UpdateURL = (query_param, query_value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(query_param, query_value);
    window.history.replaceState(null, null, url);
  }

  // Start On Page Load 
  useEffect(() => {
    showSelectedFilterTextonPageLoad()
  }, []);

// End on Page Load 
  const onSearchform = (e) => {
    e.preventDefault();
    let learning_type = "all"
    let query = document.getElementById('query').value
    let size = 4
    getSearchData(selectedSubject, selectedProgram, learning_type, query, selectSchool, selectedCenter, selectedCourseRecog, selectedCourseState, selectedLanguage, size)
    onFormSearch()
    setselectedLearningType('all')
    UpdateURL('query', query)
    UpdateURL('learning_type', 'all')

    // Remove selected learning type text 
    if($("#show_learningtype_as_text").length > 0) {
      document.getElementById("show_learningtype_as_text").remove();
    }
    // If clear all btn is showing then remove the clear all btn
    if($("#selected-filter").html()==='' && $("#clear-all-filter").length > 0) {
      document.getElementById("clear-all-filter").remove();
     }
    // UpdateURL('is_search', true)
    UpdateURL('is_section', true)

  }; 
  
 
  //IT triggers by pressing the enter key
  const handleKeypress = e => {
    if (e.keyCode === 13) {
    e.preventDefault();
    onSearchform(e);
    }
  };


  const onDropdownChange = e => {
    // show section wise result if user has remove all dropdown filter one by one and search any text in search box
    // if(is_search && is_search==="true" && $("#selected-filter").html()==='') {
    //   onFormSearch()
    // }

    if($("#selected-filter").html()==='') {
      UpdateURL('is_section', true)
      onFormSearch()
    }

  };


  const onSubjectChange = (e) => {
    let val = e.target.value;
    e.preventDefault();
    setselectedSubject(val)
    let query = document.getElementById('query').value
    getSearchData(val, selectedProgram, selectedLearningType, query, selectSchool, selectedCenter, selectedCourseRecog, selectedCourseState, selectedLanguage)
    var sub_slug =  $("#subject option:selected").attr("sub-slug");
    var sub_name =  $("#subject option:selected").attr("sub-name");
    // Update Url 
    UpdateURL('subject', sub_slug)
    showSelectedFilterText('subject', sub_name, 'show_subject_as_text')
    onDropdownChange()

  }; 

  const onProgramChange = (e) => {
    let val = e.target.value;
    e.preventDefault();
    setselectedProgram(val)
    let query = document.getElementById('query').value
    getSearchData(selectedSubject, val, selectedLearningType, query, selectSchool, selectedCenter, selectedCourseRecog, selectedCourseState, selectedLanguage)
    // Update Url 
    UpdateURL('program_degree_group', val)
    var prg_grp_name =  $("#program_group option:selected").attr("prg-grp-name");
    showSelectedFilterText('program_degree_group', prg_grp_name, 'show_program_as_text')
    onDropdownChange()

  }; 

  const onLearningTypeChange = (e) => {
    let learning_type = e.target.value;
    e.preventDefault();
    setselectedLearningType(learning_type)
    let subject = document.getElementById('subject').value
    let course_recog = document.getElementById('course_recognition').value
    let course_state = document.getElementById('course_state').value
    
    let query = document.getElementById('query').value

    // If offering is selected other than all/course then 
    if(learning_type !== "all" && learning_type !== "course") {
      subject = ""
      course_recog = ""
      course_state = ""
      setselectedSubject('')
      setselectedCourseRecog('')
      setselectedCourseState('')
      
      // If subject is already showing as selected text, then remove the selected text.
      if($("#show_subject_as_text").length > 0) {
        document.getElementById("show_subject_as_text").remove();
      }

      // If course recog is already showing as selected text, then remove the selected text.
      if($("#show_course_recog_as_text").length > 0) {
        document.getElementById("show_course_recog_as_text").remove();
      }

      // If subject is already showing as selected text, then remove the selected text.
      if($("#show_course_recog_as_text").length > 0) {
        document.getElementById("show_course_state_as_text").remove();
      }


      UpdateURL('subject', '')
      UpdateURL('course_recognition', '')
      UpdateURL('course_state', '')

    }  

    // Show offeringType based on Offering 
     //start Fetch Offering Type List from discovery
     if(learning_type !== "course") {
     var get_offering_type_url = `${my_discovery_url}/api/v1/lms-search/get-offeringtype-from-offering/?offering=${learning_type}`

     fetch(get_offering_type_url)
     .then((res) => {
         return res.json();
     })
     .then((data) => {
      setofferingTypeList(data);
     });
     //End Fetch Offering Type List from discovery
      
    }
     setselectedProgram('')
    
     // If OfferingType is already showing as selected text, then remove the selected text.
     if($("#show_program_as_text").length > 0) {
      document.getElementById("show_program_as_text").remove();
      }
      UpdateURL('program_degree_group', '')
      let program_group = ""
      getSearchData(subject, program_group, learning_type, query, selectSchool, selectedCenter, course_recog, course_state, selectedLanguage)
      UpdateURL('learning_type', learning_type)
      
      let learning_type_name =  $("#learning_type option:selected").attr("learning-type-name");
      showSelectedFilterText('learning_type', learning_type_name, 'show_learningtype_as_text')
      onDropdownChange()

      if(learning_type == "all") {
        document.getElementById("courseRecognition").removeAttribute('hidden');
        document.getElementById("subjct").removeAttribute('hidden');
        document.getElementById("courseState").removeAttribute('hidden');
        document.getElementById("prg_deg").removeAttribute('hidden');
     }
     if (learning_type == "program" || learning_type == "degree") {
      if(document.getElementById("courseRecognition").getAttribute('hidden') != 'true') {
        document.getElementById("courseRecognition").setAttribute('hidden','true');
        }
       if(document.getElementById("subjct").getAttribute('hidden') != 'true') {
        document.getElementById("subjct").setAttribute('hidden','true');
       }
       if(document.getElementById("courseState").getAttribute('hidden') != 'true') {
        document.getElementById("courseState").setAttribute('hidden','true');
       }
       document.getElementById("prg_deg").removeAttribute('hidden');
     }

     if(learning_type == "course") {
        document.getElementById("courseRecognition").removeAttribute('hidden');
        document.getElementById("subjct").removeAttribute('hidden');
        document.getElementById("courseState").removeAttribute('hidden');
        if(document.getElementById("prg_deg").getAttribute('hidden') != 'true') {
          document.getElementById("prg_deg").setAttribute('hidden','true');
         }
      }

  }; 


  const onSchoolCenterChange = (e) => {
    let val = e.target.value;
    let school = ""
    let center = ""
    let type =  $("#school-center option:selected").attr("type");

    if(type === "school"){
      setselectSchool(val)
      setselectedCenter('')
      school = val
      let school_name =  $("#school-center option:selected").attr("school-name");
      showSelectedFilterText('school', school_name, 'show_school_as_text')
    }
    else {
      setselectedCenter(val)
      setselectSchool('')
      center = val
      let center_name =  $("#school-center option:selected").attr("center-name");
      showSelectedFilterText('center', center_name, 'show_center_as_text')
    }

    let query = document.getElementById('query').value
    UpdateURL('school', school)
    UpdateURL('center', center)
    getSearchData(selectedSubject, selectedProgram, selectedLearningType, query, school, center, selectedCourseRecog, selectedCourseState, selectedLanguage)
    onDropdownChange()
  }; 


  const onLanguageChange = (e) => {
    let language = e.target.value;
    setselectedLanguage(language)
    let query = document.getElementById('query').value
    getSearchData(selectedSubject, selectedProgram, selectedLearningType, query, selectSchool, selectedCenter, selectedCourseRecog, selectedCourseState, language)
    UpdateURL('language', language)
    var language_name =  $("#language option:selected").attr("language-name");
    showSelectedFilterText('language', language_name, 'show_language_as_text')
    onDropdownChange()
    
  };

  const onCourseRecogChange = (e) => {
    let val = e.target.value;
    setselectedCourseRecog(val)
    let query = document.getElementById('query').value
    getSearchData(selectedSubject, selectedProgram, selectedLearningType, query, selectSchool, selectedCenter, val, selectedCourseState, selectedLanguage)
    UpdateURL('course_recognition', val)
    let recognition_name =  $("#course_recognition option:selected").attr("recognition-name");
    showSelectedFilterText('course_recognition', recognition_name, 'show_course_recog_as_text')
    onDropdownChange()

  };

  const onCourseStateChange = (e) => {
    let val = e.target.value;
    setselectedCourseState(val)
    let query = document.getElementById('query').value
    getSearchData(selectedSubject, selectedProgram, selectedLearningType, query, selectSchool, selectedCenter, selectedCourseRecog, val, selectedLanguage)
    UpdateURL('course_state', val)
    let course_state_name =  $("#course_state option:selected").attr("course-state-name");
    showSelectedFilterText('course_state', course_state_name, 'show_course_state_as_text')
    onDropdownChange()

  };
  
 
  
  // Start Show selected filter as text 
  const showSelectedFilterText = (selected_filter_name, selected_filter_value, selected_filter_abbr) => {

    // If user change same dropdown filter then remove previous selected text
    if($("#"+selected_filter_abbr).length > 0) {
      document.getElementById(selected_filter_abbr).remove();
    }

    // Remove selected center on school change
    if($("#show_center_as_text").length > 0 && selected_filter_name==="school") {
      document.getElementById("show_center_as_text").remove();
    }

    // Remove selected school on center change
    if($("#show_school_as_text").length > 0 && selected_filter_name==="center") {
      document.getElementById("show_school_as_text").remove();
    }
    
    // If clear all btn is showing but no filter is selected then remove the clear all btn
    if($("#selected-filter").html()==='' && $("#clear-all-filter").length > 0) {
      document.getElementById("clear-all-filter").remove();
     }

    
    // only update when there is any value in dropdown 
    if(selected_filter_value && selected_filter_value!== undefined) {
      var show_text = '<div class="dropdown fi-border selected-filter-text" id="'+selected_filter_abbr+'">'
                        +'<button class="dropbtn">'+selected_filter_value
                        +'<span id="clearSelection" selected-filter-name="'+selected_filter_name+'" selected-filter-abbr="'+selected_filter_abbr+'" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    
      $("#selected-filter").append(show_text);

      var show_clear_btn = '<div class="clear-all-filter" id="clear-all-filter">clear all</div>';

      $("#show-clear-btn").html(show_clear_btn);
    }
  };

  // End Show selected filter as text 


  // Start Show selected filter as text on first time page load 
    const showSelectedFilterTextonPageLoad = () => {

    var show_selected_text = "";
    var has_show_selected_text = false

    // If subject is already selected 
    if(!R.isEmpty(FiterDetail.selected_subject)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_subject_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_subject["subject_name"]
                        +'<span id="clearSelection" selected-filter-name="subject" selected-filter-abbr="show_subject_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

    // If Program Group/type is already selected 
    if(!R.isEmpty(FiterDetail.selected_program)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_program_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_program["program_group_name"]
                        +'<span id="clearSelection" selected-filter-name="program_degree_group" selected-filter-abbr="show_program_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }


    // If School is already selected 
    if(!R.isEmpty(FiterDetail.selected_school_name)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_school_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_school_name
                        +'<span id="clearSelection" selected-filter-name="school" selected-filter-abbr="show_school_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

    // If Center is already selected 
    if(!R.isEmpty(FiterDetail.selected_center_name)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_center_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_center_name
                        +'<span id="clearSelection" selected-filter-name="school" selected-filter-abbr="show_center_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

    // If Center is already selected 
    if(!R.isEmpty(FiterDetail.selected_language_name)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_language_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_language_name
                        +'<span id="clearSelection" selected-filter-name="language" selected-filter-abbr="show_language_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    } 

    // If course recog is already selected 
    if(!R.isEmpty(FiterDetail.selected_course_recog_name)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_course_recog_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_course_recog_name
                        +'<span id="clearSelection" selected-filter-name="course_recognition" selected-filter-abbr="show_course_recog_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    } 

    // If course state is already selected 
    if(!R.isEmpty(FiterDetail.selected_course_state)&& FiterDetail.selected_course_state !== "null" ) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_course_state_as_text">'
                        +'<button class="dropbtn">'+mx_course_state[FiterDetail.selected_course_state]
                        +'<span id="clearSelection" selected-filter-name="course_state" selected-filter-abbr="show_course_state_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    } 

    // If Learning type is already selected 
    if(!R.isEmpty(FiterDetail.select_learning_type) && FiterDetail.select_learning_type !== "all" && FiterDetail.select_learning_type !== "null" ) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_learningtype_as_text">'
                        +'<button class="dropbtn">'+mx_offering[FiterDetail.select_learning_type]
                        +'<span id="clearSelection" selected-filter-name="learning_type" selected-filter-abbr="show_learningtype_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    } 


    if(has_show_selected_text) {
        $("#selected-filter").append(show_selected_text);
        var show_clear_btn = '<div class="clear-all-filter" id="clear-all-filter">clear all</div>';
        $("#show-clear-btn").html(show_clear_btn);
    }

  }
  // End Show selected filter as text on first time page load 



   // start clear selected text and filter 
   $(document).off("click")
   $(document).on("click", "#clearSelection", function(){
    var selected_filter_name =  $(this).attr("selected-filter-name");
    var selected_filter_abbr =  $(this).attr("selected-filter-abbr");
    document.getElementById(selected_filter_abbr).remove();

    //  Remove clear all button if user one by one remove all selected text 
    if($("#selected-filter").html()==='') {
     document.getElementById("clear-all-filter").remove();
    }

    // Remove subject selected text, reset dropdown, update URLs
     if(selected_filter_name === 'subject')
     {
      $("#subject").val("");
      setselectedSubject()
      UpdateURL('subject', '')
     }

    // Remove program group selected text, reset dropdown, update URLs
     if(selected_filter_name === 'program_degree_group')
     {
      $("#program_group").val("");
      setselectedProgram()
      UpdateURL('program_degree_group', '')
     }

    // Remove school selected text, reset dropdown, update URLs
     if(selected_filter_name === 'school')
     {
      $("#school-center").val("");
      setselectSchool([])
      setselectedCenter([])

      UpdateURL('school', '')
      UpdateURL('center', '')
     }

    // Remove center selected text, reset dropdown, update URLs
     if(selected_filter_name === 'center')
     {

      $("#school-center").val("");
      setselectSchool([])
      setselectedCenter([])
      UpdateURL('school', '')
      UpdateURL('center', '')
     }

    // Remove course recogn selected text, reset dropdown, update URLs
    if(selected_filter_name === 'course_recognition')
      {
        $("#course_recognition").val("");
        setselectedCourseRecog('')
        UpdateURL('course_recognition', '')
      }

    // Remove course state selected text, reset dropdown, update URLs
    if(selected_filter_name === 'course_state')
      {
        $("#course_state").val("");
        setselectedCourseState('')
        UpdateURL('course_state', '')
      }

    // Remove language selected text, reset dropdown, update URLs
     if(selected_filter_name === 'language')
     {
      $("#language").val("");
      setselectedLanguage('')
      UpdateURL('language', '')
     }
     
    // Remove learning_type selected text, reset dropdown, update URLs
     if(selected_filter_name === 'learning_type')
     {
      $("#learning_type").val("all");
      UpdateURL('learning_type', '')
     }

    // Update the search Results 
    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let language = document.getElementById('language').value
    let course_recog = document.getElementById('course_recognition').value
    let course_state = document.getElementById('course_state').value

    let school = ""
    let center = ""
    let type =  $("#school-center option:selected").attr("type");
    if(type === "school"){
      school =document.getElementById('school-center').value
    }
    else {
      center = document.getElementById('school-center').value
    }

    getSearchData(subject, program_group, learning_type, query, school, center, course_recog, course_state, language)

    // show section wise result if user has clear all filter one by one and search any text in search box
    // if(is_search && is_search==="true" && $("#selected-filter").html()==='') {
    //   onFormSearch()
    // }

    if($("#selected-filter").html()==='') {
      UpdateURL('is_section', true)
      onFormSearch()
    }

    

    });
   // End clear selected text and filter 


    // start  Clear All
    $(document).on("click", "#clear-all-filter", function(){

      // Remove all selected text 
      $(".selected-filter-text").remove();
      $(".clear-all-filter").remove();

      // Clear All dropdown
      $("#learning_type").val("all");
      $("#subject").val("");
      $("#program_group").val("");
      $("#school-center").val("");
      $("#course_recognition").val("");
      $("#course_state").val("");
      $("#language").val("");

      // Clear All states 
      setselectedSubject()
      setselectedProgram('')
      setselectSchool([])
      setselectedCenter([])
      setselectedCourseRecog('')
      setselectedCourseState('')
      setselectedLanguage('')

      // Clear All URLs 
      UpdateURL('subject', '')
      UpdateURL('program_degree_group', '')
      UpdateURL('school', '')
      UpdateURL('center', '')
      UpdateURL('course_recognition', '')
      UpdateURL('course_state', '')
      UpdateURL('language', '')
      UpdateURL('learning_type', '')

      // Update the search result
      let subject = ""
      let learning_type = "all"
      let program_group = ""
      let query = document.getElementById('query').value
      let school = ""
      let center = ""
      let course_recog = ""
      let course_state = ""
      let language = ""

      getSearchData(subject, program_group, learning_type, query, school, center, course_recog, course_state, language)
      // show section wise result if user has search any text in search box
      // if(is_search && is_search==="true") {
      //   onFormSearch()
      // }
      // if(is_section && is_section==="true") {
      //   onFormSearch()
      // }

      UpdateURL('is_section', true)
      onFormSearch()


      

    });

    // end  Clear All


  return(
  <>
    
    <section className="search-bgimg" id="prg-page">
      <div className="container listing-container">
        <div className="row">
            <div className="col-md-7 col-sm-12 f-cell">
                <h2 className="text-white search-label"><b>Search Our Catalog</b></h2>
                <form id="formDATA"> 
                    <input type="search" id="query" name="q" 
                    value={FormQuerytxt}
                    onChange={(e) =>setFormQuerytxt(e.target.value)}
                    onKeyDown={(e) =>handleKeypress(e)}
                    placeholder="What do you want to Learn?"/>
                    <button className="searchBtn mxsearchbtn" type="button"
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
        <div className="container listing-container mx-search-container">
            <h1 className="theading-title">Filter</h1> 
          <div className="row pb-3" id="search-filter-wrap">
            
              <div className="custom-select" id="learningType">
                  <select className={(selectedLearningType !== "all")? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="learning_type" data-bs-toggle="dropdown"
                  value={selectedLearningType}
                  onChange={(e) => onLearningTypeChange(e)}
                  >
                    <option className="ColorLight" value="all">Offering</option>
                      <option value="course" learning-type-name="Course">Courses</option>
                      <option value="program" learning-type-name="Programs">Programs</option>
                      <option value="degree" learning-type-name="Degrees">Degrees</option>
                      {/* <option value="program-degree" learning-type-name="Programs & Degrees">Programs & Degrees</option> */}
                  </select>
              </div>

              <div className={(selectedLearningType === "course")? "custom-select disable-dropdown": "custom-select"} id="prg_deg">
                    <select className={Boolean(selectedProgram)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="program_group" data-bs-toggle="dropdown"
                    value={selectedProgram}
                    onChange={(e) => onProgramChange(e)}
                    >
                      <option className="ColorLight" value="">{mx_offering_type_msg[selectedLearningType]}</option>
                      {offeringTypeList.map((programs) => (
                        <option value={programs['program_group_slug']} prg-grp-name={programs['program_group_name']} >{programs['program_group_name']}</option>
                      ))}
                    </select>
                </div>

                {/* show Course by recoginition only when offering is course or no offering selected  */}
                <div className={(selectedLearningType !== "all" && selectedLearningType !== "course")? "custom-select disable-dropdown": "custom-select " } id="courseRecognition">
                {/* <div className="custom-select "> */}
                    <select className={Boolean(selectedCourseRecog)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="course_recognition" data-bs-toggle="dropdown"
                    value={selectedCourseRecog}
                    onChange={(e) => onCourseRecogChange(e)}
                    >
                      <option className="ColorLight" value="">Course Recognition</option>
                      {FiterDetail.recognition_list.map((recognition) => (
                        <option value={recognition['recognition_slug']} recognition-name={recognition['recognition_name']} >{recognition['recognition_name']}</option>
                      ))}
                    </select>
                </div>
                
                {/* show Course state only when offering is course or no offering selected  */}
                <div className={(selectedLearningType !== "all" && selectedLearningType !== "course")? "custom-select disable-dropdown": "custom-select " } id="courseState" >
                {/* <div className="custom-select "> */}
                    <select className={Boolean(selectedCourseState)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="course_state" data-bs-toggle="dropdown"
                    value={selectedCourseState}
                    onChange={(e) => onCourseStateChange(e)}
                    >
                      <option className="ColorLight" value="">Courses Status</option>
                        <option value="upcoming" course-state-name="Upcoming Courses">Upcoming Courses</option>
                        <option value="current" course-state-name="Current Courses">Current Courses</option>
                        <option value="archived" course-state-name="Archived Courses">Archived Courses</option>
                        <option value="oer" course-state-name="OERs">OERs</option>
                    </select>
                </div>
                
                <div className="custom-select" id="school_center">
                    <select className={(Boolean(selectSchool.length) || Boolean(selectedCenter.length))? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  data-bs-toggle="dropdown"
                    id="school-center"
                    // value={selectSchool}
                    value={Boolean(selectSchool.length)?(selectSchool):(selectedCenter)}
                    onChange={(e) => onSchoolCenterChange(e)}
                    >
                      <option className="ColorLight" value="">Schools/Independent Centres</option>

                      {FiterDetail.center_list.sort((a,b) => b.count - a.count).map((center) => (
                        <option value={center['center_slug']} type="center" center-name={center['center_name']} >{center['center_name']}</option>
                      ))}

                      {FiterDetail.school_list.sort((a,b) => b.count - a.count).map((schools) => (
                        <option value={schools['school_slug']} type="school" school-name={schools['school_name']}>{schools['school_name']}</option>
                      ))}
                      {/* <option className="ColorLight" value="independent-center" school-name="Independent center" >Independent center</option> */}
                    </select>
                </div>

                {/* show subject only when offering is course or no offering selected  */}
                <div className={(selectedLearningType !== "all" && selectedLearningType !== "course")? "custom-select disable-dropdown": "custom-select " } id="subjct">

                    <select className={Boolean(selectedSubject)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="subject" data-bs-toggle="dropdown"
                    value={selectedSubject}
                    onChange={(e) => onSubjectChange(e)}
                    >
                      <option className="ColorLight" sub-slug="" value="">Subject</option>
                      {FiterDetail.subject_list.map((subjects) => (
                        <option sub-slug={subjects['subject_slug']} sub-name={subjects['subject_name']} value={subjects['subject_uuid']} >{subjects['subject_name']}</option>
                      ))}
                    </select>
                </div>

                <div className="custom-select" id="lang">
                    <select className={Boolean(selectedLanguage)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  id="language" data-bs-toggle="dropdown"
                    value={selectedLanguage}
                    onChange={(e) => onLanguageChange(e)}
                    >
                      <option className="ColorLight" value="">Language</option>
                      {FiterDetail.language_list.map((language) => (
                        <option value={language['0']} language-name={language['1']} >{language['1']}</option>
                      ))}
                    </select>
                </div>
          
          </div>
        </div>

        {/* start Selected filter  */}
        <div className="container listing-container selected-filter-wrap mx-search-container">
          <div className="selected-filter" id="selected-filter"></div>
          <div className="show-clear-btn" id="show-clear-btn"></div>
      </div>
        {/* End Selected filter  */}


    </section>

  </>

  );
};


SearchFilterContainer.propTypes = {}

export default SearchFilterContainer

