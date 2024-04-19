
/**
 * Banner for Center Detail Page
 */

import React, { useState, useEffect } from 'react';


const CenterFilterContainer = ({centerInfo, FiterDetail}) => {

    // const [selectedProgram, setselectedProgram] = useState(FiterDetail.selected_program['program_group_slug']);
    const [selectedProgram, setselectedProgram] = useState();
    // const [selectedSubject, setselectedSubject] = useState(FiterDetail.selected_subject['subject_uuid']);
    const [selectedLanguage, setselectedLanguage] = useState(FiterDetail.selected_language);
    const [selectedOrg, setselectedOrg] = useState();

    
    function UpdateURL(query_param, query_value) {
        const url = new URL(window.location.href);
        url.searchParams.set(query_param, query_value);
        window.history.replaceState(null, null, url);
    }

    const onProgramChange = (e) => {
        let val = e.target.value;
        e.preventDefault();
        setselectedProgram(val)

        // let subject = document.getElementById('subject').value
        // let learning_type = document.getElementById('learning_type').value
        // let query = document.getElementById('query').value
        // let school = document.getElementById('school').value
        // let center = document.getElementById('center').value
        // let language = document.getElementById('language').value

        // getSearchData(subject, val, learning_type, query, school, center, language)

        // Update Url 
        UpdateURL('program', val)

        // var prg_grp_name =  $("#program_group option:selected").attr("prg-grp-name");
        // showSelectedFilterText('program_degree_group', prg_grp_name, 'show_program_as_text')
        // onDropdownChange()

    }; 

    const onLanguageChange = (e) => {
        let language = e.target.value;
        setselectedLanguage(language)
        // let subject = document.getElementById('subject').value
        // let learning_type = document.getElementById('learning_type').value
        // let program_group = document.getElementById('program_group').value
        // let query = document.getElementById('query').value
        // let school = document.getElementById('school').value
        // let center = document.getElementById('center').value
        // getSearchData(subject, program_group, learning_type, query, school, center, language)
       
        UpdateURL('language', language)
        // var language_name =  $("#language option:selected").attr("language-name");
        // showSelectedFilterText('language', language_name, 'show_language_as_text')
        // onDropdownChange()
        
      };


      const onOrgChange = (e) => {
        let val = e.target.value;
        setselectedOrg(val)
        // let subject = document.getElementById('subject').value
        // let learning_type = document.getElementById('learning_type').value
        // let program_group = document.getElementById('program_group').value
        // let query = document.getElementById('query').value
        // let school = document.getElementById('school').value
        // let center = document.getElementById('center').value
        // getSearchData(subject, program_group, learning_type, query, school, center, language)
       
        UpdateURL('organization', val)
        // var language_name =  $("#language option:selected").attr("language-name");
        // showSelectedFilterText('language', language_name, 'show_language_as_text')
        // onDropdownChange()
        
      }
      

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
                        <select className={Boolean(selectedOrg)? "dropdown-toggle SelectOne": "dropdown-toggle SelectOne disable-option"}  id="organisation" data-bs-toggle="dropdown"
                        value={selectedOrg}
                        onChange={(e) => onOrgChange(e)}
                        >
                        <option className="ColorLight" value="">Organisation</option>
                        {FiterDetail.organization_list.map((organisation) => (
                            <option value={organisation['organization_uuid']} >{organisation['organization_key']}</option>
                        ))}
                        </select>
                    </div>



                    
                    <div className="custom-select">

                        <select className= "dropdown-toggle SelectOne" id="mode" data-bs-toggle="dropdown"
                        // value={selectedSubject}
                        // onChange={(e) => onSubjectChange(e)}
                        >
                        <option className="ColorLight" sub-slug="" value="">Modes</option>
                        {/* {FiterDetail.subject_list.map((subjects) => (
                            <option sub-slug={subjects['subject_slug']} sub-name={subjects['subject_name']} value={subjects['subject_uuid']} >{subjects['subject_name']}</option>
                        ))} */}
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
