/**
 * School and Center listing Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import SchoolCenterBanner from './SchoolCenterBanner';
import SchoolList from './SchoolList';
import CenterList from './CenterList';
import PartnerList from './PartnerList';
import CircularProgress from '@material-ui/core/CircularProgress';

const SchoolCenterlistingContainer = ({my_discovery_url}) => {
  const [schoolcenterlist, setschoolcenterlist] = useState([]);
  const [partnerlist, setpartnerlist] = useState([]);
  const [listingLoader, setlistingLoader] = useState();

  useEffect(() => {
      
  var school_center_type_list_url = `${my_discovery_url}/api/v1/get-school-center-list`
  var partner_list_url = `${my_discovery_url}/api/v1/lms-partner-list`

//start Fetch school, center and program type listing from discovery
  fetch(school_center_type_list_url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log("school, center and program type listing",data);
    setschoolcenterlist(data);
    setlistingLoader(true)
    
  });
//End Fetch school, center and program type listing from discovery


//start Fetch Partner listing from discovery
  fetch(partner_list_url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
  //   console.log("Partner listing",data);
    setpartnerlist(data);
  });
  //End Fetch Partner listing from discovery

  }, []);
  
    return (
        <>
        <SchoolCenterBanner/>
        {!(listingLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(schoolcenterlist) && schoolcenterlist.length !== 0 && <SchoolList schoollist={schoolcenterlist.schools} />} 
        {!R.isEmpty(schoolcenterlist) && schoolcenterlist.length !== 0 && <CenterList centerlist={schoolcenterlist.centers} />} 
        {listingLoader && !R.isEmpty(partnerlist) && partnerlist.length !== 0 && <PartnerList partnerlist={partnerlist} />} 
       </>
    );
};

SchoolCenterlistingContainer.propTypes = {}

export default SchoolCenterlistingContainer
