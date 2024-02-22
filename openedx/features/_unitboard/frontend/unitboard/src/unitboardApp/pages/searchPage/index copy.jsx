
/**
 * Search Results for Degree Page
 */


const SearchResultsDegreesContainer = ({DegreeResults}) => {


    // console.log("Degree Search Results",DegreeResults )
    // For Pagination



// End Pagination 
  
  return(
    

    <section>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4">Degrees</h1>
            </div>
            <div className="col-md-6 py-4">
                <nav className="pagination-container">
                    <button className="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page">
                      &lt;
                    </button>
                
                    <div id="pagination-numbers">
                
                    </div>
                
                    <button className="pagination-button" id="next-button" aria-label="Next page" title="Next page">
                      &gt;
                    </button>
                  </nav>
            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {DegreeResults.results.map((degree) => (

                  
                  <li>
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src={degree['banner_image']} alt="" />
                            </div>
                           
                            <p className="title p-3">{degree['title']}</p>
                            <div className="d-flex p-3 bor-1">
                                <a href={'../program-detail-slug/' + degree['uuid']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
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


SearchResultsDegreesContainer.propTypes = {}

export default SearchResultsDegreesContainer

