
/**
 * Search Filter Page
 */

import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as R from "ramda";
// import { useNavigate, Link, useParams } from "react-router-dom";
import $ from 'jquery';
import * as R from "ramda";


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


  const mx_offering = {
    "all": "Offering",
    "course": "Courses",
    "program": "Programs",
    "degree": "Degrees",
    "program-degree": "Program & Degrees",
  }
  
  function UpdateURL(query_param, query_value) {
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
    UpdateURL('learning_type', 'all')

    // Remove selected learning type text 
    if($("#show_learningtype_as_text").length > 0) {
      document.getElementById("show_learningtype_as_text").remove();
    }
    // If clear all btn is showing then remove the clear all btn
    if($("#selected-filter").html()=='' && $("#clear-all-filter").length > 0) {
      document.getElementById("clear-all-filter").remove();
     }

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
      let query = document.getElementById('query').value

     if(query && query!== undefined && $("#selected-filter").html()=='') {
      onFormSearch()
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
    let language = document.getElementById('language').value

    getSearchData(val, program_group, learning_type, query, school, center, language)

    var sub_slug =  $("#subject option:selected").attr("sub-slug");
    var sub_name =  $("#subject option:selected").attr("sub-name");

    UpdateURL('subject', sub_slug)
    showSelectedFilterText('subject', sub_name, 'show_subject_as_text')

    onDropdownChange()

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
    
    var prg_grp_name =  $("#program_group option:selected").attr("prg-grp-name");
    showSelectedFilterText('program_degree_group', prg_grp_name, 'show_program_as_text')
    onDropdownChange()

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
    UpdateURL('learning_type', val)
    
    let learning_type_name =  $("#learning_type option:selected").attr("learning-type-name");

   showSelectedFilterText('learning_type', learning_type_name, 'show_learningtype_as_text')
   onDropdownChange()


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

    let school_name =  $("#school option:selected").attr("school-name");

    showSelectedFilterText('school', school_name, 'show_school_as_text')
    onDropdownChange()


  }; 

  const onCenterChange = (e) => {
    let val = e.target.value;

    $("#center").removeClass('disable-option');

    setselectedCenter(val)
    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let language = document.getElementById('language').value

    getSearchData(subject, program_group, learning_type, query, school, val, language)
    UpdateURL('center', val)
    
    let center_name =  $("#center option:selected").attr("center-name");
    
    showSelectedFilterText('center', center_name, 'show_center_as_text')
    onDropdownChange()

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
    var language_name =  $("#language option:selected").attr("language-name");
    showSelectedFilterText('language', language_name, 'show_language_as_text')
    onDropdownChange()
    
  };


 
  
  // Start Show selected filter as text 
  function showSelectedFilterText(selected_filter_name, selected_filter_value, selected_filter_abbr) {

    // If user change same dropdown filter then remove previous selected text
    if($("#"+selected_filter_abbr).length > 0) {
      document.getElementById(selected_filter_abbr).remove();
    }

    // If clear all btn is showing but no filter is selected then remove the clear all btn
    if($("#selected-filter").html()=='' && $("#clear-all-filter").length > 0) {
      document.getElementById("clear-all-filter").remove();
     }

    // Remove selected center on school change
    if($("#show_center_as_text").length > 0 && selected_filter_name=="school") {
      document.getElementById("show_center_as_text").remove();
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
  function showSelectedFilterTextonPageLoad() {

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
                        +'<span id="clearSelection" selected-filter-name="center" selected-filter-abbr="show_center_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
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
    if($("#selected-filter").html()=='') {
     document.getElementById("clear-all-filter").remove();
    }

    // Remove subject selected text, reset dropdown, update URLs
     if(selected_filter_name == 'subject')
     {
      $("#subject").val("");
      setselectedSubject()
      UpdateURL('subject', '')
     }

    // Remove program group selected text, reset dropdown, update URLs
     if(selected_filter_name == 'program_degree_group')
     {
      $("#program_group").val("");
      setselectedProgram()
      UpdateURL('program_degree_group', '')
     }

    // Remove school selected text, reset dropdown, update URLs
     if(selected_filter_name == 'school')
     {
      $("#school").val("");
      setselectSchool([])
      setcenterList([])
      setselectedCenter()

    // Remove center if school remove
      if($("#show_center_as_text").length > 0) {
        document.getElementById("show_center_as_text").remove();
      }
      UpdateURL('school', '')
      UpdateURL('center', '')
     }

    // Remove center selected text, reset dropdown, update URLs
     if(selected_filter_name == 'center')
     {
      $("#center").val("");
      setselectedCenter()
      $("#center").addClass('disable-option');
      UpdateURL('center', '')
     }

    // Remove language selected text, reset dropdown, update URLs
     if(selected_filter_name == 'language')
     {
      $("#language").val("");
      setselectedLanguage()
      UpdateURL('language', '')
     }
     
    // Remove learning_type selected text, reset dropdown, update URLs
     if(selected_filter_name == 'learning_type')
     {
      $("#learning_type").val("all");
      // setselectedLearningType('all')
      UpdateURL('learning_type', '')
     }

    // Update the search Results 
    let subject = document.getElementById('subject').value
    let learning_type = document.getElementById('learning_type').value
    let program_group = document.getElementById('program_group').value
    let query = document.getElementById('query').value
    let school = document.getElementById('school').value
    let center = document.getElementById('center').value
    let language = document.getElementById('language').value
    getSearchData(subject, program_group, learning_type, query, school, center, language)

    // show section wise result if user has clear all filter one by one and search any text in search box
    if(query && query!== undefined && $("#selected-filter").html()=='') {
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
      $("#school").val("");
      $("#center").val("");
      $("#language").val("");

      // Clear All states 
      setselectedSubject()
      setselectedProgram('')
      setselectSchool([])
      setcenterList([])
      setselectedCenter()
      setselectedLanguage('')
      // setselectedLearningType('all')

      // Clear All URLs 
      UpdateURL('subject', '')
      UpdateURL('program_degree_group', '')
      UpdateURL('school', '')
      UpdateURL('center', '')
      UpdateURL('language', '')
      UpdateURL('learning_type', '')
      $("#center").addClass('disable-option');

      // Update the search result
      let subject = document.getElementById('subject').value
      let learning_type = "all"
      let program_group = ""
      let query = document.getElementById('query').value
      let school = document.getElementById('school').value
      let center = document.getElementById('center').value
      let language = ""

      getSearchData(subject, program_group, learning_type, query, school, center, language)
      
      // show section wise result if user has search any text in search box
      if(query && query!== undefined) {
        onFormSearch()
      }

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
                      <option className="ColorLight" sub-slug="" value="">Subject</option>
                      {FiterDetail.subject_list.map((subjects) => (
                        <option sub-slug={subjects['subject_slug']} sub-name={subjects['subject_name']} value={subjects['subject_uuid']} >{subjects['subject_name']}</option>
                      ))}
                    </select>
                </div>
                <div className="custom-select">
                    <select className={Boolean(selectedProgram)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="program_group" data-bs-toggle="dropdown"
                    value={selectedProgram}
                    onChange={(e) => onProgramChange(e)}
                    >
                      <option className="ColorLight" value="">Offering type</option>
                      {FiterDetail.program_group_list.map((programs) => (
                        <option value={programs['program_group_slug']} prg-grp-name={programs['program_group_name']} >{programs['program_group_name']}</option>
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
                        <option value={schools['school_slug']} school-name={schools['school_name']}>{schools['school_name']}</option>
                      ))}
                      <option className="ColorLight" value="independent-center" school-name="Independent center" >Independent center</option>
                    </select>
                </div>
                
                <div className="custom-select ">
                
                    <select className={Boolean(centerList.length)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} data-bs-toggle="dropdown"
                    id="center"
                    value={selectedCenter}
                    onChange={(e) => onCenterChange(e)}
                    >
                      <option className="ColorLight" value="">centre</option>
                      {centerList.map((center) => (
                        <option value={center['center_slug']} center-name={center['center_name']} >{center['center_name']}</option>
                      ))}
                    </select>
                </div>

            {/* </div>
            {/* First row for filter dropdown End */}

            {/* 2nd row for filter dropdown Start */}
            {/* <div className="firstROW d-flex pb-3 py-2"> */} 
              

                <div className="custom-select">
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

                <div className="custom-select ">
                    <select className={(selectedLearningType != "all")? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="learning_type" data-bs-toggle="dropdown"
                    value={selectedLearningType}
                    onChange={(e) => onLearningTypeChange(e)}
                    >
                      <option className="ColorLight" value="all">Offering</option>
                        <option value="course" learning-type-name="Course">Courses</option>
                        <option value="program" learning-type-name="Programs">Programs</option>
                        <option value="degree" learning-type-name="Degrees">Degrees</option>
                        <option value="program-degree" learning-type-name="Programs & Degrees">Programs & Degrees</option>
                    </select>
                </div>
            {/* </div> */}
            {/* 2nd row for filter dropdown Start */}


          
          </div>
        </div>

        {/* start Selected filter  */}
        <div className="container listing-container selected-filter-wrap">
          <div className="selected-filter" id="selected-filter"></div>

          <div className="show-clear-btn" id="show-clear-btn">
            
          </div>
          
      </div>
        {/* End Selected filter  */}


    </section>

  </>

  );
};


SearchFilterContainer.propTypes = {}

export default SearchFilterContainer

