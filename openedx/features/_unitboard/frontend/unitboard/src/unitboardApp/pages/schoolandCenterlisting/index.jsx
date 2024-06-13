/**
 * School and Center listing Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import SchoolCenterBanner from './SchoolCenterBanner';
import SchoolCenterList from './SchoolCenterList';
import PartnerList from './PartnerList';
import CircularProgress from '@material-ui/core/CircularProgress';

const SchoolCenterlistingContainer = ({my_discovery_url}) => {
  const [schoolcenterlist, setschoolcenterlist] = useState([]);
  const [partnerlist, setpartnerlist] = useState([]);
  const [listingLoader, setlistingLoader] = useState();

  useEffect(() => {
      
  //start Fetch school, center listing from discovery
    fetch(`${my_discovery_url}/api/v1/get-school-center-list`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setschoolcenterlist(data);
      setlistingLoader(true)
      
    });
  //End Fetch school, center listing from discovery


  //start Fetch Partner listing from discovery
    fetch(`${my_discovery_url}/api/v1/get-partner-list`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setpartnerlist(data);
    });
    //End Fetch Partner listing from discovery

  }, []);
  
    return (
        <>
        <SchoolCenterBanner/>
        {!(listingLoader) && <CircularProgress className="mx-loader"/>}
        {!R.isEmpty(schoolcenterlist) && <SchoolCenterList schoolcenterList={schoolcenterlist} />} 
        {listingLoader && !R.isEmpty(partnerlist) && partnerlist.length !== 0 && <PartnerList partnerlist={partnerlist} />} 
       </>
    );
};

SchoolCenterlistingContainer.propTypes = {}

export default SchoolCenterlistingContainer
