/**
 * Program Faculty Page
 */


const DegreeFacultyContainer = ({programfaculty}) => {
 

    return (
    
                
        <section className="learn-school program-faculty bg-light">
            <div className="container">
            <h1 className="theading-title pb-3">Degrees Faculty</h1>
            <div className="row">

            {programfaculty.map((faculty) => (

                <div className="col-md-4 col-sm-4 col-lg-4 mb-4">
                    <div className="card service-box program-faculty-card">
                        <div className="text-center"><img src={faculty['image']} className="img-fluid"/></div>
                        <div className="card-title">
                            <h5 className="text-center faculty-name"><b>{faculty['name']}</b></h5>
                            <p className="text-center para faculty-desc px-2">{faculty['description']}</p>
                        </div>
                    </div>
                </div>
               
            ))}

            {/* Start No result Found  */}
                    
            {programfaculty.length== 0 && (
                <div className="no-result-found">
                    <div className="no-result-found-msg">Degree Faculty are not available.</div>
                </div>
            )}
            {/* End No result Found  */}


            </div>
                
            </div>
        </section>

       
    );
};

DegreeFacultyContainer.propTypes = {}

export default DegreeFacultyContainer
// 