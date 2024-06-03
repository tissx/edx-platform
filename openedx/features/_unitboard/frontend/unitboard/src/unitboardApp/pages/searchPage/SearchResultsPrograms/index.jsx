
/**
 * Search Results for Courses Page
 */
import Pagination from '@material-ui/lab/Pagination';


const SearchResultsProgramsContainer = ({ProgramResults, Querytxt, getProgramPaginationData}) => {


  function handleProgPageChange(event, value) {
    getProgramPaginationData(value)
  }
// End Pagination 
  
  return(
    

    <section>
    <div className="container listing-container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title">{(Querytxt)? '"'+ Querytxt + '" Programs' : 'Programs'}</h1>
            </div>
            <div className="col-md-6">
                
          <Pagination className="result-pagination"  count={ProgramResults['num_pages']} onChange={handleProgPageChange} variant="outlined" shape="rounded" />
          
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
                                <a className="mx-prog-link"><span>{(program.type.charAt(program.type.length - 1) == "s")?(program.type.slice(0, -1)): program.type}</span></a>
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


SearchResultsProgramsContainer.propTypes = {}

export default SearchResultsProgramsContainer

