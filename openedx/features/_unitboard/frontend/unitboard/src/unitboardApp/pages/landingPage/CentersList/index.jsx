/**
 * Center Listing Page
 */


const CentersListContainer = ({centerListData}) => {
  
    return (

        <section className="learn-school">
            <div className="container listing-container">
                <div class="border-bottom"><h1 className="school-title">Independent Centres</h1></div>

                <div className="row mx-box p_tb" id="iconright">
                    {/* start Dynamic center  */}
                    {centerListData.results.map((center) => (

                    <div className="course-box">
                        <a className="mx-link" href={center.center_detail} >
                            <div className="service-item body-light tissxoff">
                                <div className="img_area">
                                    <img className="img-fluid sch_card" 
                                    src={center.image?center.image: '../static/tissx-theme/images/dummy/dummy_course1.png'}
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                    }}
                                    alt=""/>
                                </div>
                                
                                <div className="service-text position-relativ">
                                    <p className="text-school">{center.title}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                    ))} 

                    {/* End Dynamic center  */}

                    {/* Start No result Found  */}
                    {centerListData.count == 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Centres are not available.</div>
                    </div>
                    )}
                    {/* End No result Found  */}
                    
                </div>
            </div>
        </section>


    );
};

CentersListContainer.propTypes = {}

export default CentersListContainer
