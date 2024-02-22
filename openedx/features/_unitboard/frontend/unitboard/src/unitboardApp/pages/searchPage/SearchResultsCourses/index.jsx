
/**
 * Search Results for Courses Page
 */

import Pagination from '@material-ui/lab/Pagination';


const SearchResultsCoursesContainer = ({CourseResults, Querytxt, getCoursePaginationData}) => {


    // console.log("course CourseResults",CourseResults )
   
  
 // For Pagination

//  const paginationNumbers = document.getElementById("pagination-number-courses");
// //  const paginatedList = document.getElementById("paginated-list");
// //  const listItems = paginatedList.querySelectorAll("li");
//  const nextButton = document.getElementById("next-button");
//  const prevButton = document.getElementById("prev-button");
 
//  const paginationLimit = 4;
// //  const pageCount = Math.ceil(listItems.length / paginationLimit);
//  const pageCount = Math.ceil(10 / paginationLimit);
//  let currentPage = 1;
 
//  const disableButton = (button) => {
//    button.classList.add("disabled");
//    button.setAttribute("disabled", true);
//  };
 
//  const enableButton = (button) => {
//    button.classList.remove("disabled");
//    button.removeAttribute("disabled");
//  };
 
//  const handlePageButtonsStatus = () => {
//    if (currentPage === 1) {
//      disableButton(prevButton);
//    } else {
//      enableButton(prevButton);
//    }
 
//    if (pageCount === currentPage) {
//      disableButton(nextButton);
//    } else {
//      enableButton(nextButton);
//    }
//  };
 
//  const handleActivePageNumber = () => {
//    document.querySelectorAll(".pagination-number-course").forEach((button) => {
//      button.classList.remove("active");
//      const pageIndex = Number(button.getAttribute("page-index"));
//      if (pageIndex == currentPage) {
//        button.classList.add("active");
//      }
//    });
//  };
 
//  const appendPageNumber = (index) => {
//    const pageNumber = document.createElement("button");
//    pageNumber.className = "pagination-number-course";
//    pageNumber.innerHTML = index;
//    pageNumber.setAttribute("page-index", index);
//    pageNumber.setAttribute("aria-label", "Page " + index);
 
//    paginationNumbers.appendChild(pageNumber);
//  };
 
//  const getPaginationNumbers = () => {
//    for (let i = 1; i <= pageCount; i++) {
//      appendPageNumber(i);
//    }
//  };
 
//  const setCurrentPage = (pageNum) => {
//    currentPage = pageNum;
 
//    handleActivePageNumber();
//    handlePageButtonsStatus();
   
//    const prevRange = (pageNum - 1) * paginationLimit;
//    const currRange = pageNum * paginationLimit;
 
//   //  listItems.forEach((item, index) => {
//   //    item.classList.add("hidden");
//   //    if (index >= prevRange && index < currRange) {
//   //      item.classList.remove("hidden");
//   //    }
//   //  });
//  };
 
//  window.addEventListener("load", () => {
//    getPaginationNumbers();
//    setCurrentPage(1);
 
//    prevButton.addEventListener("click", () => {
//      setCurrentPage(currentPage - 1);
//    });
 
//    nextButton.addEventListener("click", () => {
//      setCurrentPage(currentPage + 1);
//    });
 
//    document.querySelectorAll(".pagination-number-course").forEach((button) => {
//      const pageIndex = Number(button.getAttribute("page-index"));
 
//      if (pageIndex) {
//        button.addEventListener("click", () => {
//          setCurrentPage(pageIndex);
//        });
//      }
//    });
//  });

// End Pagination 
function handleCoursePageChange(event, value) {
  getCoursePaginationData(value)
}


  return(
    

    <section>
    <div className="container listing-container">
        <div className="row">
            <div className="col-md-6">
                <h1 className="theading-title py-4">{(Querytxt)?  '"'+ Querytxt + '" Courses' : 'Courses'}</h1>
            </div>
            <div className="col-md-6 py-4">
                {/* <nav className="pagination-container">
                    <button className="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page">
                      &lt;
                    </button>
                
                    <div id="pagination-number-course">
                
                    </div>
                
                    <button className="pagination-button" id="next-button" aria-label="Next page" title="Next page">
                      &gt;
                    </button>
                  </nav> */}

          <Pagination className="result-pagination"  count={CourseResults['num_pages']} onChange={handleCoursePageChange} variant="outlined" shape="rounded" />
            </div>
            <main>
                <ul id="paginated-list" data-current-page="1" aria-live="polite">
                  
                  {CourseResults.results.map((course) => (

                  
                  <li>
                    <div className="course-box">
                        <div className="service-item body-light tissxoff">
                            <div className="img-sec">
                                <img className="img-fluid" src={course['card_image_url']} alt="" />
                            </div>
                           
                            <p className="title p-3">{course['title']}</p>
                            <div className="d-flex p-3 bor-1">
                                <a href={course['course_runs'][0]['key']}><button type="button" className="btn btn-sm orgclr btn-read-more">Read more</button></a>
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


SearchResultsCoursesContainer.propTypes = {}

export default SearchResultsCoursesContainer

