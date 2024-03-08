

/**
 * Search Results for Section wise Courses Page
 */


const SectionResultsCoursesContainer = ({CourseResults, Querytxt, showMoreDetail}) => {

function handleShowMore() {
    let subject = document.getElementById('subject').value
    let learning_type = "course"
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
        <div className="row course-section-search">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title">{(Querytxt)?  '"'+ Querytxt + '" Courses' : 'Courses'}</h1>
            </div>
            <div className="col-md-6 py-4">
               <p className="show-result-count" onClick={handleShowMore}>Show all({CourseResults.count})</p>

            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {CourseResults.results.map((course) => (
                  
                  <li>
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" 
                                src={course['card_image_url']} 
                                onError={(e) => {
                                  e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                               }}
                                alt="" />
                            </div>
                           
                            <p className="title p-3">{course['title']}</p>
                            <div className="d-flex p-3 bor-1">


                                <a href={'../courses/' +course['course_runs'][0]['key'] + '/about'}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
                                <a href={'../courses/' +course['course_runs'][0]['key'] + '/about'}><small><img className="img moreicon" /></small></a>
                            </div> 
                        </div>
                    </div>
                  </li>

                ))}

                {/* start no search results found  */}
                {CourseResults.count == 0 && (
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


SectionResultsCoursesContainer.propTypes = {}

export default SectionResultsCoursesContainer

