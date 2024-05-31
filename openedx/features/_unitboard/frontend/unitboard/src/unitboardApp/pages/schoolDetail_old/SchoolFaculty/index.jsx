
/**
 * School Faculty for School Detail Page
 */


const SchoolFacultyContainer = ({SchoolFacultyInfo}) => {

    return (
      
        <section className="school-faculty-section">
            <div className="container listing-container pt-3">
                <h1 className="theading-title pb-3">Program Faculty</h1>
                <div className="row school-faculty">

                    {SchoolFacultyInfo.instructor.map((faculty) => (
                   
                    <div className="col-md-4 col-sm-4 col-lg-4 mb-4">
                        <div className="card service-box center-faculty-card">
                            <div className="text-center"><img src={faculty['image']} className="img-fluid"/></div>
                            <div className="card-title">
                                <h5 className="text-center faculty-name"><b>{faculty['name']}</b></h5>
                                <p className="text-center para faculty-desc px-2">{faculty['description']}</p>
                            </div>
                        </div>
                    </div>

                    ))}

                    {/* Start No result Found  */}
                    
                    {SchoolFacultyInfo.instructor.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Faculty is not available.</div>
                    </div>
                    )}
                    {/* End No result Found  */}

                </div>
            </div>
        </section>



    );
};

SchoolFacultyContainer.propTypes = {}

export default SchoolFacultyContainer
