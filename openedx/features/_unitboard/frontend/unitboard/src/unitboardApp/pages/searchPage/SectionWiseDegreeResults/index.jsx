
/**
 * Search Results for Section wise Degree Page
 */

import RightArrowIcon from "unitboardApp/pages/common/Icons/RightArrowIcon";

const SectionResultsDegreeContainer = ({DegreeResults, Querytxt, showMoreDetail}) => {

    function handleShowMore() {
        let subject = document.getElementById('subject').value
        let learning_type = "degree"
        let learning_type_text = "Degrees"
        let query = document.getElementById('query').value
        let program_group = document.getElementById('program_group').value
        let school = document.getElementById('school').value
        let center = document.getElementById('center').value
        let language = document.getElementById('language').value
    
        showMoreDetail(subject, program_group, learning_type, learning_type_text, query, school, center, language)
    
    }

  return(
    
    <section>
    <div className="container listing-container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title"> {(Querytxt)?  '"'+ Querytxt + '" Degrees' : 'Degrees'}</h1>
            </div>
            <div className="col-md-6 py-4">
            <p className="show-result-count" onClick={handleShowMore}>Show ({DegreeResults.count}) <RightArrowIcon/></p>
              
            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {DegreeResults.results.map((degree) => (

                  
                  // <li>
                  //   <div className="course-box">
                  //       <div className="service-item body-light tissxoff">
                  //           <div className="img-sec">
                  //               <img className="img-fluid" 
                  //               src={degree['banner_image']}
                  //               onError={(e) => {
                  //                 e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                  //              }}
                  //               alt="" />
                  //           </div>
                           
                  //           <p className="title p-3">{degree['title']}</p>
                  //           <div className="d-flex p-3 bor-1">
                  //               <a href={'../program-detail/' + degree['uuid']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                  //               <a><small><img className="img moreicon" /></small></a>
                  //           </div> 
                  //       </div>
                  //   </div>
                  // </li>
                    <li>

                        <div className="program_data service-item body-light tissxoff mx-search-results">
                          <a className="mx-prog-link" href={'../program-detail/' + degree['uuid']}>
                              <div className="img-Area">
                                  <img className="img-fluid program_img_data"
                                  
                                  onError={(e) => {
                                      e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                  }}
                                  src={degree['banner_image']} alt=""/>
                              </div>
                              <div className="content_box">
                                  <div className="heading_text">
                                      <h6>{degree['title']}</h6>
                                      <p>{degree.mx_program_descrp}</p>
                                      
                                  </div>
                              <div className="prf_certificate">    
                                  <a className="mx-prog-link" href={'../program-detail/' + degree['uuid']}><span>{degree.type}</span></a>
                                  <p className="py-1">{degree.mx_no_of_courses} Courses</p>
                              </div>
                              </div>
                          </a>
                        </div>
                    </li>

                ))}


                {/* start no search results found  */}
                {DegreeResults.count == 0 && (
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


SectionResultsDegreeContainer.propTypes = {}

export default SectionResultsDegreeContainer

