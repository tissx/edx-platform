
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
            <div className="col-md-6 py-4">
                {/* <nav className="pagination-container">
                    <button className="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page">
                      &lt;
                    </button>
                
                    <div id="pagination-numbers">
                
                    </div>
                
                    <button className="pagination-button" id="next-button" aria-label="Next page" title="Next page">
                      &gt;
                    </button>
                  </nav> */}
          <Pagination className="result-pagination"  count={ProgramResults['num_pages']} onChange={handleProgPageChange} variant="outlined" shape="rounded" />
          
            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {ProgramResults.results.map((program) => (

                  
                  <li>
                    <div className="course-box">
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
                    </div>
                  </li>

                ))}
                </ul>
              </main>
        </div>
    </div>

</section>

  );
};


SearchResultsProgramsContainer.propTypes = {}

export default SearchResultsProgramsContainer

