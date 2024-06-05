/**
 * Program and Degree listing Banner Page
 */

import React from 'react';

const ProgramDegreeFilterContainer = ({programlist}) => {

    return (
        <section className="bglight py-2">
            <div className="container listing-container">
                <h1 className="theading-title">Filter</h1> 
            <div className="row">

                {programlist.map((data) => (

                <div className="dropdown course-box1">
                    <button className="dropbtn">{data['program_type']}
                        <span className="pad-left"><i className="fa fa-chevron-down pl-3"></i></span></button>
                    <div className="dropdown-content">

                    {data.program.map((program) => (
                    <a href={program['program_detail']}>{program['program_name']}</a>

                    ))}

                    </div>
                </div>

                ))}
            </div>
            </div>
        </section>
      
        
    );
};

ProgramDegreeFilterContainer.propTypes = {}

export default ProgramDegreeFilterContainer
