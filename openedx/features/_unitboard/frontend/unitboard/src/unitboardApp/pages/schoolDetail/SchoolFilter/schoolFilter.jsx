
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import * as R from "ramda";


const SchoolFilterContainer = ({schoolInfo, FiterDetail, getSearchData}) => {
    const [selectedProgram, setselectedProgram] = useState(FiterDetail.selected_program["program_uuid"]);
    const [selectedLanguage, setselectedLanguage] = useState(FiterDetail.selected_language["language_slug"]);
    const [selectedOrg, setselectedOrg] = useState(FiterDetail.selected_organization['organization_key_lower']);
    const [selectedMode, setselectedMode] = useState(FiterDetail.selected_mode['mode_slug']);
    const [selectedSubject, setselectedSubject] = useState(FiterDetail.selected_subject['subject_uuid']);
    const [selectedCourseRecog, setselectedCourseRecog] = useState(FiterDetail.selected_course_recog);
    const [selectedCourseState, setselectedCourseState] = useState(FiterDetail.selected_course_state);

    const mx_course_state = {
        "": "Courses State",
        "upcoming": "Upcoming Courses",
        "current": "Current Courses",
        "archived": "Archived Courses",
        "oer": "OERs",
      }

    // Start On Page Load 
    useEffect(() => {
        showSelectedFilterTextonPageLoad()
    }, []);
    
    const UpdateURL = (query_param, query_value) => {
    // function UpdateURL(query_param, query_value) {
        const url = new URL(window.location.href);
        url.searchParams.set(query_param, query_value);
        window.history.replaceState(null, null, url);
    }

    const onProgramChange = (e) => {
        let val = e.target.value;
        e.preventDefault();
        setselectedProgram(val)
        // let language = document.getElementById('language').value
        // let organization = document.getElementById('organization').value
        // let mode = document.getElementById('mode').value
        // let subject = document.getElementById('subject').value
        // alert(selectedLanguage)

        getSearchData(val, selectedLanguage, selectedOrg, selectedMode, selectedSubject, selectedCourseRecog, selectedCourseState)
        // getSearchData(val, language, organization, mode, subject)
        // Update Url 
        UpdateURL('program', val)

        var prg_name =  $("#program option:selected").attr("prg-name");
        showSelectedFilterText('program', prg_name, 'show_program_as_text')

    }; 

    const onLanguageChange = (e) => {
        let language = e.target.value;
        setselectedLanguage(language)

        // let program = document.getElementById('program').value
        // let organization = document.getElementById('organization').value
        // let mode = document.getElementById('mode').value
        // let subject = document.getElementById('subject').value

        getSearchData(selectedProgram, language, selectedOrg, selectedMode, selectedSubject, selectedCourseRecog, selectedCourseState)
        
        // getSearchData(program, language, organization, mode, subject)
       
        UpdateURL('language', language)
        var language_name =  $("#language option:selected").attr("language-name");
        showSelectedFilterText('language', language_name, 'show_language_as_text')
        
      };


      const onOrgChange = (e) => {
        let val = e.target.value;
        setselectedOrg(val)

        // let program = document.getElementById('program').value
        // let language = document.getElementById('language').value
        // let mode = document.getElementById('mode').value
        // let subject = document.getElementById('subject').value

        getSearchData(selectedProgram, selectedLanguage, val, selectedMode, selectedSubject, selectedCourseRecog, selectedCourseState)
        // getSearchData(program, language, val, mode, subject)
       
        UpdateURL('organization', val)
        var org_name =  $("#organization option:selected").attr("org-name");
        showSelectedFilterText('organization', org_name, 'show_org_as_text')
        
      }
      

      const onModeChange = (e) => {
        let val = e.target.value;
        setselectedMode(val)
        // let program = document.getElementById('program').value
        // let language = document.getElementById('language').value
        // let organization = document.getElementById('organization').value
        // let subject = document.getElementById('subject').value

        getSearchData(selectedProgram, selectedLanguage, selectedOrg, val, selectedSubject, selectedCourseRecog, selectedCourseState)
        // getSearchData(program, language, organization, val, subject)
       
        UpdateURL('mode', val)
        var mode_name =  $("#mode option:selected").attr("mode-name");
        showSelectedFilterText('mode', mode_name, 'show_mode_as_text')
        
      }

      const onSubjectChange = (e) => {
        let val = e.target.value;
        setselectedSubject(val)
        // let program = document.getElementById('program').value
        // let language = document.getElementById('language').value
        // let organization = document.getElementById('organization').value
        // let mode = document.getElementById('mode').value

        getSearchData(selectedProgram, selectedLanguage, selectedOrg, selectedMode, val, selectedCourseRecog, selectedCourseState)
        // getSearchData(program, language, organization, mode, val)
       
        var subject_name =  $("#subject option:selected").attr("subject-name");
        var sub_slug =  $("#subject option:selected").attr("sub-slug");
        UpdateURL('subject', sub_slug)
        showSelectedFilterText('subject', subject_name, 'show_subject_as_text')
        
      }

    const onCourseRecogChange = (e) => {
        let val = e.target.value;
        setselectedCourseRecog(val)
        getSearchData(selectedProgram, selectedLanguage, selectedOrg, selectedMode, selectedSubject, val, selectedCourseState)
        UpdateURL('course_recognition', val)
        let recognition_name =  $("#course_recognition option:selected").attr("recognition-name");
        showSelectedFilterText('course_recognition', recognition_name, 'show_course_recog_as_text')

    };

    const onCourseStateChange = (e) => {
        let val = e.target.value;
        setselectedCourseState(val)
        getSearchData(selectedProgram, selectedLanguage, selectedOrg, selectedMode, selectedSubject, selectedCourseRecog, val)
        UpdateURL('course_state', val)
        let course_state_name =  $("#course_state option:selected").attr("course-state-name");
        showSelectedFilterText('course_state', course_state_name, 'show_course_state_as_text')

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

    // If program is already selected 
    if(!R.isEmpty(FiterDetail.selected_program["program_name"])) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_program_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_program["program_name"]
                        +'<span id="clearSelection" selected-filter-name="program" selected-filter-abbr="show_program_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

     // If language is already selected 
     if(!R.isEmpty(FiterDetail.selected_language["language_name"])) {
        has_show_selected_text = true
        show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_language_as_text">'
                          +'<button class="dropbtn">'+FiterDetail.selected_language["language_name"]
                          +'<span id="clearSelection" selected-filter-name="language" selected-filter-abbr="show_language_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                          +'</div>';
      } 

    // If organization is already selected 
    if(!R.isEmpty(FiterDetail.selected_organization['organization_key'])) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_org_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_organization['organization_key']
                        +'<span id="clearSelection" selected-filter-name="organization" selected-filter-abbr="show_org_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

    // If Mode is already selected 
    if(!R.isEmpty(FiterDetail.selected_mode['mode_name'])) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_mode_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_mode['mode_name']
                        +'<span id="clearSelection" selected-filter-name="mode" selected-filter-abbr="show_mode_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

    // If Subject is already selected 
    if(!R.isEmpty(FiterDetail.selected_subject["subject_name"])) {
        has_show_selected_text = true
        show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_subject_as_text">'
                          +'<button class="dropbtn">'+FiterDetail.selected_subject["subject_name"]
                          +'<span id="clearSelection" selected-filter-name="subject" selected-filter-abbr="show_subject_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
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

    // Remove Program selected text, reset dropdown, update URLs
     if(selected_filter_name == 'program')
     {
      $("#program").val("");
      setselectedProgram()
      UpdateURL('program', '')
     }

    // Remove Language selected text, reset dropdown, update URLs
     if(selected_filter_name == 'language')
     {
      $("#language").val("");
      setselectedLanguage()
      UpdateURL('language', '')
     }

    // Remove organization selected text, reset dropdown, update URLs
     if(selected_filter_name == 'organization')
     {
      $("#organization").val("");
      setselectedOrg()
      UpdateURL('organization', '')
     }
   

    // Remove mode selected text, reset dropdown, update URLs
     if(selected_filter_name == 'mode')
     {
      $("#mode").val("");
      setselectedMode()
      UpdateURL('mode', '')
     }

    if(selected_filter_name == 'subject')
    {
        $("#subject").val("");
        setselectedSubject()
        UpdateURL('subject', '')
    }

    
    // Remove course recogn selected text, reset dropdown, update URLs
    if(selected_filter_name == 'course_recognition')
    {
        $("#course_recognition").val("");
        setselectedCourseRecog()
        UpdateURL('course_recognition', '')
    }
  
     // Remove course state selected text, reset dropdown, update URLs
    if(selected_filter_name == 'course_state')
    {
        $("#course_state").val("");
        setselectedCourseState()
        UpdateURL('course_state', '')
    }

    // Update the search Results 
    let program = document.getElementById('program').value
    let language = document.getElementById('language').value
    let organization = document.getElementById('organization').value
    let mode = document.getElementById('mode').value
    let subject = document.getElementById('subject').value
    let course_recog = document.getElementById('course_recognition').value
    let course_state = document.getElementById('course_state').value
    getSearchData(program, language, organization, mode, subject, course_recog, course_state)

    });
   // End clear selected text and filter 


    // start  Clear All
    $(document).on("click", "#clear-all-filter", function(){

      // Remove all selected text 
      $(".selected-filter-text").remove();
      $(".clear-all-filter").remove();

      // Clear All dropdown
      $("#program").val("");
      $("#language").val("");
      $("#organization").val("");
      $("#mode").val("");
      $("#subject").val("");
      $("#course_recognition").val("");
      $("#course_state").val("");

      // Clear All states 
      setselectedProgram('')
      setselectedLanguage('')
      setselectedOrg('')
      setselectedMode('')
      setselectedSubject('')
      setselectedCourseRecog('')
      setselectedCourseState('')
     
      // Clear All URLs 
      UpdateURL('program', '')
      UpdateURL('language', '')
      UpdateURL('organization', '')
      UpdateURL('mode', '')
      UpdateURL('subject', '')
      UpdateURL('course_recognition', '')
      UpdateURL('course_state', '')
   
      // Update the search result
      let program = ""
      let language = ""
      let organization = ""
      let mode = ""
      let subject = ""
      let course_recog = ""
      let course_state = ""
      getSearchData(program, language, organization, mode, subject, course_recog, course_state)

    });

    // end  Clear All]



    return (
        <>
        <section className="position-relative" id="prg-page1">
            <img src={schoolInfo['banner_image']} className="img-fluid bg-center-school"/>
            <div className="overlay-cap">
            <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="box-left mobile-hide">
                                <div className="card-1">
                                    <img src={schoolInfo['school_image']} className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            <div className="pd-leftalign">
                                <h1 className="theading-title mob-hright text-white">{schoolInfo['center_name']}</h1>
                                <p className="text-white sub-title">{schoolInfo['description']}</p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </section>

        <section className="bg-light">
            <div className="container">
                <div className="row" id="cbox-left">
                    <div className="col-md-12 col-sm-12 bg-light">
                        <h1 className="theading-title">School Offering</h1> 
                        <p className="para">{schoolInfo['short_description']}</p>
                    </div>
                </div>

                {schoolInfo['address']?(
                     <div className="row address-wrap">
                     <div className="col-md-12 col-sm-12 bg-light">
                         <h2 className="sub-theading-title">School Address</h2> 
                         <p className="para">{schoolInfo['address']}</p>
                     </div>
                 </div>
                ):("")}
               
            </div>

        </section>


        <section className="bg-light p-2" >
            <div className="container listing-container center-filter-wrap mx-search-container">
                <h1 className="theading-title">Filter</h1> 
                <div className="row row-cols-6 pb-3">
            
                    <div className="custom-select">
                        <select className={Boolean(selectedProgram)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="program" data-bs-toggle="dropdown"
                        value={selectedProgram}
                        onChange={(e) => onProgramChange(e)}
                        >
                        <option className="ColorLight"  value="">Programs</option>
                        {FiterDetail.program_list.map((programs) => (
                            <option prg-name={programs['program_name']} value={programs['program_uuid']} >{programs['program_name']}</option>
                        ))}
                        </select>
                    </div>
                    

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


                    <div className="custom-select">
                        <select className={Boolean(selectedOrg)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  id="organization" data-bs-toggle="dropdown"
                        value={selectedOrg}
                        onChange={(e) => onOrgChange(e)}
                        >
                        <option className="ColorLight" value="">Organisation</option>
                        {FiterDetail.organization_list.map((organisation) => (
                            <option org-name={organisation['organization_key']} value={organisation['organization_key_lower']} >{organisation['organization_key']}</option>
                        ))}
                        </select>
                    </div>

                    <div className="custom-select">
                        <select className={Boolean(selectedMode)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  id="mode" data-bs-toggle="dropdown"
                        value={selectedMode}
                        onChange={(e) => onModeChange(e)}
                        >
                        <option className="ColorLight" value="">Modes</option>

                        {FiterDetail.mode_list.map((mode) => (
                            <option value={mode['0']} mode-name={mode['1']} >{mode['1']}</option>
                        ))}

                        </select>
                    </div>


                    <div className="custom-select">
                        <select className={Boolean(selectedSubject)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  id="subject" data-bs-toggle="dropdown"
                        value={selectedSubject}
                        onChange={(e) => onSubjectChange(e)}
                        >
                        <option className="ColorLight" sub-slug="" value="">Subject</option>

                        {FiterDetail.subject_list.map((subject) => (
                            <option value={subject['subject_uuid']} sub-slug={subject['subject_slug']} subject-name={subject['subject_name']} >{subject['subject_name']}</option>
                        ))}

                        </select>
                    </div>


                    <div className="custom-select ">
                    <select className={Boolean(selectedCourseRecog)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="course_recognition" data-bs-toggle="dropdown"
                    value={selectedCourseRecog}
                    onChange={(e) => onCourseRecogChange(e)}
                    >
                      <option className="ColorLight" value="">Course by Recognition</option>
                      {FiterDetail.recognition_list.map((recognition) => (
                        <option value={recognition['recognition_slug']} recognition-name={recognition['recognition_name']} >{recognition['recognition_name']}</option>
                      ))}
                    </select>
                    </div>
                

                    <div className="custom-select ">
                        <select className={Boolean(selectedCourseState)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="course_state" data-bs-toggle="dropdown"
                        value={selectedCourseState}
                        onChange={(e) => onCourseStateChange(e)}
                        >
                        <option className="ColorLight" value="">Courses State</option>
                            <option value="upcoming" course-state-name="Upcoming Courses">Upcoming Courses</option>
                            <option value="current" course-state-name="Current Courses">Current Courses</option>
                            <option value="archived" course-state-name="Archived Courses">Archived Courses</option>
                            <option value="oer" course-state-name="OERs">OERs</option>
                        </select>
                    </div>
                    
            
            </div>
            </div>

            {/* start Selected filter  */}
            <div className="container listing-container selected-filter-wrap mx-search-container">
            <div className="selected-filter" id="selected-filter"></div>

            <div className="show-clear-btn" id="show-clear-btn">
                
            </div>
            
        </div>
            {/* End Selected filter  */}


        </section>



        </>


    );
};

SchoolFilterContainer.propTypes = {}

export default SchoolFilterContainer
