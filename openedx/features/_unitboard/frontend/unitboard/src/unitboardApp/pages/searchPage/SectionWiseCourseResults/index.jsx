

/**
 * Search Results for Section wise Courses Page
 */

import RightArrowIcon from "unitboardApp/pages/common/Icons/RightArrowIcon";
import dateFormat from 'dateformat'
import $ from 'jquery';

const SectionResultsCoursesContainer = ({CourseResults, Querytxt, showMoreDetail}) => {

const handleShowMore = () => {
    let subject = document.getElementById('subject').value
    let learning_type = "course"
    let learning_type_text = "Courses"
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
        <div className="row course-section-search">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title">{(Querytxt)?  '"'+ Querytxt + '" Courses' : 'Courses'}</h1>
            </div>
            <div className="col-md-6 py-4">
               <p className="show-result-count" onClick={handleShowMore}>Show ({CourseResults.count}) <RightArrowIcon/></p>

            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  {CourseResults.results.map((course) => (
                  <li>
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
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
                                  <span className="more_learn">Courses</span>
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


SectionResultsCoursesContainer.propTypes = {}

export default SectionResultsCoursesContainer

