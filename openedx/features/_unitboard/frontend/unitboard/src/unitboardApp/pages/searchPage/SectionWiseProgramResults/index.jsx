
/**
 * Search Results for section wise Progra, Page
 */

import RightArrowIcon from "unitboardApp/pages/common/Icons/RightArrowIcon";
import $ from 'jquery';

const SectionResultsProgramContainer = ({ProgramResults, Querytxt, showMoreDetail}) => {

    const handleShowMore = () => {
        let subject = document.getElementById('subject').value
        let learning_type = "program"
        let learning_type_text = "Programs"
        let query = document.getElementById('query').value
        let program_group = document.getElementById('program_group').value
     
        let language = document.getElementById('language').value
        let course_recog = document.getElementById('course_recognition').value
        let course_state = document.getElementById('course_state').value
        let school = ""
        let center = ""
        let type =  $("#school-center option:selected").attr("type");
        if(type === "school"){
          school =document.getElementById('school-center').value
        }
        else {
          center = document.getElementById('school-center').value
        }

        showMoreDetail(subject, program_group, learning_type, learning_type_text, query, school, center, course_recog, course_state, language)
    
    }
  
  return(
    

    <section>
    <div className="container listing-container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title">{(Querytxt)? '"'+ Querytxt + '" Programs' : 'Programs'}</h1>
            </div>
            <div className="col-md-6 py-4">
               
               <p className="show-result-count" onClick={handleShowMore}>Show ({ProgramResults.count}) <RightArrowIcon/></p>

            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {ProgramResults.results.map((program) => (
                  
                  <li>
                        <div className="program_data service-item body-light tissxoff mx-search-results">
                          <a className="mx-prog-link" href={'../program-detail/' + program['uuid']}>
                              <div className="img-Area">
                                  <img className="img-fluid program_img_data"
                                  onError={(e) => {
                                      e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                  }}
                                  src={program['banner_image']} alt=""/>
                              </div>
                              <div className="content_box">
                                  <div className="heading_text">
                                      <h6 title={program['title']}>{program['title']}</h6>
                                      <p>{program.mx_program_descrp}</p>
                                  </div>
                              <div className="prf_certificate">    
                                  <a className="mx-prog-link"><span>{(program.type.charAt(program.type.length - 1) === "s")?(program.type.slice(0, -1)): program.type}</span></a>
                                  <p className="py-1">{program.mx_no_of_courses} Courses</p>
                              </div>
                              </div>
                          </a>
                        </div>
                  </li>

                ))}

                {/* start no search results found  */}
                {ProgramResults.count === 0 && (
                  <div className="no-search-result">
                        No search results found...
                  </div>
                )}
                {/* start no search results found  */}
                </ul>
              </main>
        </div>
    </div>

</section>

  );
};


SectionResultsProgramContainer.propTypes = {}

export default SectionResultsProgramContainer

