
/**
 * Search Results for section wise Progra, Page
 */

import RightArrowIcon from "unitboardApp/pages/common/Icons/RightArrowIcon";

const SectionResultsProgramContainer = ({ProgramResults, Querytxt, showMoreDetail}) => {

    function handleShowMore() {
        let subject = document.getElementById('subject').value
        let learning_type = "program"
        let query = document.getElementById('query').value
        let program_group = document.getElementById('program_group').value
        let school = document.getElementById('school').value
        let center = document.getElementById('center').value
        let language = document.getElementById('language').value
    
        showMoreDetail(subject, program_group, learning_type, query, school, center, language)
    
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
                    {/* <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" 
                                src={program['banner_image']}
                                 
                                onError={(e) => {
                                  e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                               }}
                                 alt="" />
                            </div>
                           
                            <p className="title p-3">{program['title']}</p>
                            <div className="d-flex p-3 bor-1">
                                <a href={'../program-detail/' + program['uuid']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                <a><small><img className="img moreicon" /></small></a>
                            </div> 
                        </div>
                    </div> */}


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
                                      <h6>{program['title']}</h6>
                                      <p>{program.mx_program_descrp}</p>
                                      
                                  </div>
                              <div className="prf_certificate">    
                                  <a className="mx-prog-link" href={'../program-detail/' + program['uuid']}><span>{program.type}</span></a>
                                  <p className="py-1">{program.mx_no_of_courses} Courses</p>
                              </div>
                              </div>
                          </a>
                        </div>


                  </li>

                ))}

                {/* start no search results found  */}
                {ProgramResults.count == 0 && (
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

