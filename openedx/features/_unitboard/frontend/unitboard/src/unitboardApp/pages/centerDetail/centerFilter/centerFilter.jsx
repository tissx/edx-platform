
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import * as R from "ramda";


const CenterFilterContainer = ({centerInfo, FiterDetail, getSearchData}) => {

    const [selectedProgram, setselectedProgram] = useState(FiterDetail.selected_program["program_uuid"]);
    const [selectedLanguage, setselectedLanguage] = useState(FiterDetail.selected_language["language_slug"]);
    const [selectedOrg, setselectedOrg] = useState(FiterDetail.selected_organization['organization_key_lower']);
    const [selectedMode, setselectedMode] = useState(FiterDetail.selected_mode['mode_slug']);

    
      // Start On Page Load 
    useEffect(() => {
        showSelectedFilterTextonPageLoad()
    }, []);
    
    function UpdateURL(query_param, query_value) {
        const url = new URL(window.location.href);
        url.searchParams.set(query_param, query_value);
        window.history.replaceState(null, null, url);
    }

    const onProgramChange = (e) => {
        let val = e.target.value;
        e.preventDefault();
        setselectedProgram(val)
       
        let language = document.getElementById('language').value
        let organization = document.getElementById('organization').value
        let mode = document.getElementById('mode').value

        getSearchData(val, language, organization, mode)
        // Update Url 
        UpdateURL('program', val)

        var prg_name =  $("#program option:selected").attr("prg-name");
        showSelectedFilterText('program', prg_name, 'show_program_as_text')
        // onDropdownChange()

    }; 

    const onLanguageChange = (e) => {
        let language = e.target.value;
        setselectedLanguage(language)

        let program = document.getElementById('program').value
        let organization = document.getElementById('organization').value
        let mode = document.getElementById('mode').value

        getSearchData(program, language, organization, mode)
       
        UpdateURL('language', language)
        var language_name =  $("#language option:selected").attr("language-name");
        showSelectedFilterText('language', language_name, 'show_language_as_text')
        // onDropdownChange()
        
      };


      const onOrgChange = (e) => {
        let val = e.target.value;
        setselectedOrg(val)

        let program = document.getElementById('program').value
        let language = document.getElementById('language').value
        let mode = document.getElementById('mode').value

        getSearchData(program, language, val, mode)
       
        UpdateURL('organization', val)
        var org_name =  $("#organization option:selected").attr("org-name");
        showSelectedFilterText('organization', org_name, 'show_org_as_text')
        // onDropdownChange()
        
      }
      

      const onModeChange = (e) => {
        let val = e.target.value;
        setselectedMode(val)
        let program = document.getElementById('program').value
        let language = document.getElementById('language').value
        let organization = document.getElementById('organization').value

        getSearchData(program, language, organization, val)
       
        UpdateURL('mode', val)
        var mode_name =  $("#mode option:selected").attr("mode-name");
        showSelectedFilterText('mode', mode_name, 'show_mode_as_text')
        // onDropdownChange()
        
      }



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
    if(!R.isEmpty(FiterDetail.selected_program)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_program_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_program["program_name"]
                        +'<span id="clearSelection" selected-filter-name="program" selected-filter-abbr="show_program_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

     // If language is already selected 
     if(!R.isEmpty(FiterDetail.selected_language)) {
        has_show_selected_text = true
        show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_language_as_text">'
                          +'<button class="dropbtn">'+FiterDetail.selected_language["language_name"]
                          +'<span id="clearSelection" selected-filter-name="language" selected-filter-abbr="show_language_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                          +'</div>';
      } 

    // If organization is already selected 
    if(!R.isEmpty(FiterDetail.selected_organization)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_org_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_organization['organization_key']
                        +'<span id="clearSelection" selected-filter-name="organization" selected-filter-abbr="show_org_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
                        +'</div>';
    }

    // If Mode is already selected 
    if(!R.isEmpty(FiterDetail.selected_mode)) {
      has_show_selected_text = true
      show_selected_text += '<div class="dropdown fi-border selected-filter-text" id="show_mode_as_text">'
                        +'<button class="dropbtn">'+FiterDetail.selected_mode['mode_name']
                        +'<span id="clearSelection" selected-filter-name="mode" selected-filter-abbr="show_mode_as_text" class="pad-left"><i class="fa fa-close pl-3"></i></span></button>'
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
     
    // Update the search Results 
    let program = document.getElementById('program').value
    let language = document.getElementById('language').value
    let organization = document.getElementById('organization').value
    let mode = document.getElementById('mode').value
    getSearchData(program, language, organization, mode)

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

      // Clear All states 
      setselectedProgram('')
      setselectedLanguage('')
      setselectedOrg('')
      setselectedMode('')
     

      // Clear All URLs 
      UpdateURL('program', '')
      UpdateURL('language', '')
      UpdateURL('organization', '')
      UpdateURL('mode', '')
   
      // Update the search result
      let program = document.getElementById('program').value
      let language = document.getElementById('language').value
      let organization = document.getElementById('organization').value
      let mode = document.getElementById('mode').value
      getSearchData(program, language, organization, mode)

    });

    // end  Clear All]



    return (
        <>
        <section className="position-relative" id="prg-page1">
            <img src={centerInfo['banner_image']} className="img-fluid bg-center-school"/>
            <div className="overlay-cap">
            <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="box-left mobile-hide">
                                <div className="card-1">
                                    <img src={centerInfo['center_image']} className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            <div className="pd-leftalign">
                                <h1 className="theading-title mob-hright text-white">{centerInfo['center_name']}</h1>
                                <p className="text-white sub-title">{centerInfo['description']}</p>
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
                        <h1 className="theading-title">Centres Offerings</h1> 
                        <p className="para">{centerInfo['short_description']}</p>
                    </div>
                </div>
            </div>
        </section>



        <section className="bg-light p-2" >
            <div className="container listing-container">
                <h1 className="theading-title">Filter</h1> 
                <div className="row row-cols-6 pb-3">
            
                    <div className="custom-select">
                        <select className={Boolean(selectedProgram)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"} id="program" data-bs-toggle="dropdown"
                        value={selectedProgram}
                        onChange={(e) => onProgramChange(e)}
                        >
                        <option className="ColorLight" sub-slug="" value="">Programs</option>
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
                            <option mode-name={mode['mode_name']} value={mode['mode_slug']} >{mode['mode_name']}</option>
                        ))}
                        </select>
                    </div>
                    
            
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

CenterFilterContainer.propTypes = {}

export default CenterFilterContainer
