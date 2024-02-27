
/**
 * Search Results for section wise Progra, Page
 */


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
               
               <p className="show-result-count" onClick={handleShowMore}>Show ({ProgramResults.count})</p>

            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {ProgramResults.results.map((program) => (

                  
                  <li>
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src={program['banner_image']} alt="" />
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


SectionResultsProgramContainer.propTypes = {}

export default SectionResultsProgramContainer

