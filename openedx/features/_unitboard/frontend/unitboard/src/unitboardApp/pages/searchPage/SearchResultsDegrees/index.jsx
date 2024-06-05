
/**
 * Search Results for Degree Page
 */

import Pagination from '@material-ui/lab/Pagination';

const SearchResultsDegreesContainer = ({DegreeResults, Querytxt, getDegreePaginationData}) => {


    // console.log("Degree Search Results",DegreeResults )
    // For Pagination

    function handleDegreePageChange(event, value) {
      getDegreePaginationData(value)
    }

// End Pagination 
  
  return(
    

    <section>
    <div className="container listing-container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4 search-result-title"> {(Querytxt)?  '"'+ Querytxt + '" Degrees' : 'Degrees'}</h1>
            </div>
            <div className="col-md-6 py-4">
                
          <Pagination className="result-pagination"  count={DegreeResults['num_pages']} onChange={handleDegreePageChange} variant="outlined" shape="rounded" />

            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {DegreeResults.results.map((degree) => (

                  
                  <li>

                    <div className="program_data service-item body-light tissxoff mx-search-results">
                      <a className="mx-prog-link" href={'../degree-detail/' + degree['uuid']}>
                          <div className="img-Area">
                              <img className="img-fluid program_img_data"
                              
                              onError={(e) => {
                                  e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                              }}
                              src={degree['banner_image']} alt=""/>
                          </div>
                          <div className="content_box">
                              <div className="heading_text">
                                  <h6 title={degree['title']}>{degree['title']}</h6>
                                  <p>{degree.mx_program_descrp}</p>
                                  
                              </div>
                          <div className="prf_certificate">    
                              {/* <a className="mx-prog-link" href={'../program-detail/' + degree['uuid']}><span>{degree.type}</span></a> */}
                              <a className="mx-prog-link"><span>{(degree.type.charAt(degree.type.length - 1) === "s")?(degree.type.slice(0, -1)): degree.type}</span></a>

                              <p className="py-1">{degree.mx_no_of_courses} Courses</p>
                          </div>
                          </div>
                      </a>
                    </div>

                  </li>

                ))}


                {/* start no search results found  */}
                {DegreeResults.count === 0 && (
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


SearchResultsDegreesContainer.propTypes = {}

export default SearchResultsDegreesContainer

