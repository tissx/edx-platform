
/**
 * Search Results for Courses Page
 */

import Pagination from '@material-ui/lab/Pagination';
import dateFormat from 'dateformat'

const SearchResultsCoursesContainer = ({CourseResults, Querytxt, getCoursePaginationData}) => {


function handleCoursePageChange(event, value) {
  getCoursePaginationData(value)
}


  return(
    

    <section>
    <div className="container listing-container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title">{(Querytxt)?  '"'+ Querytxt + '" Courses' : 'Courses'}</h1>
            </div>
            <div className="col-md-6">
               

          <Pagination className="result-pagination"  count={CourseResults['num_pages']} onChange={handleCoursePageChange} variant="outlined" shape="rounded" />
            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {CourseResults.results.map((course) => (
                  <li>
                    <div className="course-box">
                        <div className="service-item body-light tissxoff" 
                        >
                            <a className="search-course-box-link" href={'../courses/' +course['course_runs'][0]['key'] + '/about'}>
                              <div className="img-sec">
                                  <img className="img-fluid" 
                                  src={course['card_image_url']} 
                                  onError={(e) => {
                                    e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                }}
                                  alt="" />
                              </div>
                            
                              <p className="title course-title" title={course['title']}>{course['title']}</p>

                              <p className="box-short-descp">Starts: {dateFormat( course['course_runs'][0]['start'], "mmmm dd, yyyy")}</p>
                              <div className="course_btn">
                                  <span className="more_learn">Course</span>
                                  {/* {(course['mx_course_program_link'])?(<span className="prog-label" title={course['mx_course_program_link']}>{(course['mx_course_program_link'].charAt(course['mx_course_program_link'].length - 1) == ",")?(course['mx_course_program_link'].slice(0, -1)): course['mx_course_program_link']}</span>): ("")} */}
                                  {(course['mx_course_program_link'])?(<span className="prog-label" title={course['mx_course_program_link'].slice(0, -1)}>{course['mx_course_program_link'].slice(0, -1)}</span>): ("")}

                              </div>

                              </a>
                        </div>
                    </div>
                  </li>

                ))}

                  {/* start no search results found  */}
                   {CourseResults.count === 0 && (
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


SearchResultsCoursesContainer.propTypes = {}

export default SearchResultsCoursesContainer

