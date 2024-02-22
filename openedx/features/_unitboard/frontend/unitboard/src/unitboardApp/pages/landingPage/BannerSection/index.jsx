/**
 * Banner Item Page
 */

import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ClearIcon from '@material-ui/icons/Clear';
// import classNames from 'classnames';


const BannerSectionContainer = () => {
  
const handleFormsubmit = (e) => {

    let query = document.getElementById('query').value
    window.location.href = 'search/?learning_type=course&query=' + query
}

//IT triggers by pressing the enter key
const handleKeypress = e => {
    if (e.keyCode === 13) {
    e.preventDefault();

        handleFormsubmit(e);

    }
  };

    return (
        <section className="bgreen-home">
        <div className="container listing-container">
            <div className="row">
                <div className="col-md-7 col-sm-12 degree-listing f-cell">
                    <h1 className="theading-title-white">Online Education</h1>
                    <p className="pb-20 text-white">Courses | Programmes | Degrees</p>
                    <form className="example">
                        <input type="text" placeholder="| Search from 1200+ Courses"
                        id="query"
                        name="search2"
                        required
                        onKeyDown={(e) => handleKeypress(e) }
                        
                        />
                        <button className="greenbg" type="button"
                        onClick={(e) => handleFormsubmit(e)}
                        ><i className="fa fa-search"></i> <span>Search</span></button>
                      </form><br/><br/> <br/>
                    <p className="txt-explore">Explore All Courses</p>
                </div>
                
                <div className="col-md-5 col-sm-12 s-cell">
                    <div className="py-5 ">
                        <img src="../static/tissx-theme/images/landing_page/images/bg.png" className="img-fluid img-hide"/>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
        
    );
};

BannerSectionContainer.propTypes = {}

export default BannerSectionContainer
