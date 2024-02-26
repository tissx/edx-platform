
/**
 * School Detail listing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";
import { useNavigate, Link, useParams } from "react-router-dom";

import SchoolDetailBannerContainer from './SchoolDetailBanner';
import SchoolsCenterList from './SchoolsCenterList';
import SchoolFaculty from './SchoolFaculty';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from '../common/loader';

const SchoolDeatilContainer = ({my_discovery_url}) => {
    
  const [schooldetail, setschooldetail] = useState([]);
  const [schoolfacultydetail, setschoolfacultydetail] = useState([]);
  const [schoolLoader, setschoolLoader] = useState();

  const { slug } = useParams();

  useEffect(() => {
 
    var school_detail_url = `${my_discovery_url}/api/v1/get-school-from-slug/?slug=${slug}`
    var school_faculty_url = `${my_discovery_url}/api/v1/get-faculty-for-school/?slug=${slug}`

    //start Fetch school detail from discovery
    fetch(school_detail_url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log("school detail",data);
        setschooldetail(data);
        setschoolLoader(true)
    });
    //End Fetch school detail from discovery


     //start Fetch school Faculty from discovery
     fetch(school_faculty_url)
     .then((res) => {
         return res.json();
     })
     .then((data) => {
        //  console.log("school faculty detail",data);
         setschoolfacultydetail(data);
     });
     //End Fetch school Faculty from discovery

     
  }, []);
  
    return (
        <>
        {!(schoolLoader) && <Loader/>}

        {!R.isEmpty(schooldetail) && schooldetail.length !== 0 && <SchoolDetailBannerContainer SchoolInfo={schooldetail.school_info} />} 
        {!R.isEmpty(schooldetail) && schooldetail.length !== 0 && <SchoolsCenterList SchoolInfo={schooldetail.school_info} CenterList={schooldetail.centers} />} 
        {(schoolLoader) && !R.isEmpty(schoolfacultydetail) && schoolfacultydetail.length !== 0 && <SchoolFaculty SchoolFacultyInfo={schoolfacultydetail}  />} 

       </>
    );
};

SchoolDeatilContainer.propTypes = {}

export default SchoolDeatilContainer
