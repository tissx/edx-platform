/**
 * Program and Degree listing Page
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from "ramda";
import ProgramDegreeBanner from './ProgramDegreeBanner';
import ProgramDegreeFilter from './ProgramDegreeFilter';
import ProgramDegreeList from './programDegreeList';

const ProgramDegreelistingContainer = ({my_discovery_url}) => {

  const [programdegreelist, setprogramdegreelist] = useState([]);


  useEffect(() => {
    
 
var program_degree_list_url = `${my_discovery_url}/api/v1/get-program-degree-list`

//start Fetch program degree listing from discovery
  fetch(program_degree_list_url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log("program degree listing",data);
    setprogramdegreelist(data);
  });
//End Fetch program degree listing from discovery


  }, []);
  
    return (
        <>
        {/* <ProgramInfo/> */}
        {/* {!R.isEmpty(programdetail) && programdetail.length !== 0 && <ProgramInfo programinfo={programdetail.program_info} />} */}
        
       <ProgramDegreeBanner/>
       {/* <ProgramDegreeFilter/> */}
        {!R.isEmpty(programdegreelist) && programdegreelist.length !== 0 && <ProgramDegreeFilter programlist={programdegreelist} />}
        {!R.isEmpty(programdegreelist) && programdegreelist.length !== 0 && <ProgramDegreeList programlist={programdegreelist} />}

       {/* <ProgramDegreeList/> */}
        
       </>
    );
};

ProgramDegreelistingContainer.propTypes = {}

export default ProgramDegreelistingContainer
