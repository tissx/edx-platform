/**
 * Program and Degree listing Page
 */

import React, { useState, useEffect } from 'react';
import * as R from "ramda";
import ProgramDegreeBanner from './ProgramDegreeBanner';
import ProgramDegreeFilter from './ProgramDegreeFilter';
import ProgramDegreeList from './programDegreeList';

const ProgramDegreelistingContainer = ({my_discovery_url}) => {

  const [programdegreelist, setprogramdegreelist] = useState([]);


  useEffect(() => {
 
    fetch(`${my_discovery_url}/api/v1/get-program-degree-list`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setprogramdegreelist(data);
    });
  //End Fetch program degree listing from discovery

  }, []);
  
    return (
        <>
        
       <ProgramDegreeBanner/>
        {!R.isEmpty(programdegreelist) && programdegreelist.length !== 0 && <ProgramDegreeFilter programlist={programdegreelist} />}
        {!R.isEmpty(programdegreelist) && programdegreelist.length !== 0 && <ProgramDegreeList programlist={programdegreelist} />}

       </>
    );
};

ProgramDegreelistingContainer.propTypes = {}

export default ProgramDegreelistingContainer
