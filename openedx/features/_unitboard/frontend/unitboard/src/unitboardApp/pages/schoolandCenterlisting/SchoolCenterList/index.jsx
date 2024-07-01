/**
 * school/Independent centre listing 
 */


const SchoolCenterListContainer = ({schoolcenterList}) => {
    return (
            <section>
                <div className="container">
                    <div className="row listing-school-center mx-box p_tb" id="iconright">
                        <h1 className="text-align-left"><b>Schools/Independent Centres</b></h1>
                        {/* start center  */}
                        {schoolcenterList['centers'].sort((a,b) => b.count - a.count).map((center) => (
                            <div className="course-box">
                                <a className="mx-link" href={center['center_detail']}>
                                    <div className="service-item body-light tissxoff">
                                        <div className="img_area">
                                            <img className="img-fluid sch_card" 
                                            src={center['center_image']} 
                                            onError={(e) => {
                                                e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                            }}
                                            alt=""/>
                                        </div>
                                        <p className="title p-3" title={center['center_name']}>{center['center_name']}</p>
                                        <span className="school-center-label">Independent Centre</span>  
                                    </div>
                                </a>
                            </div>
                            ))}

                        {/* end center  */}
                        {schoolcenterList['schools'].sort((a,b) => b.count - a.count).map((school) => (
                        <div className="course-box">
                        <a className="mx-link" href={school['school_detail']}>
                            <div className="service-item body-light tissxoff">
                                <div className="img_area">
                                    <img className="img-fluid sch_card" 
                                    src={school['school_image']} 
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                        }}
                                    alt=""/>
                                </div>
                                <p className="title p-3" title={school['school_name']}>{school['school_name']}</p>
                                <span className="school-center-label">School</span>  
                            </div>
                        </a>
                        </div>
                        ))}

                    {/* Start No result Found  */}
                    
                    {/* {schoollist.length== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Schools are not available.</div>
                    </div> */}
                    {/* )} */}
                    {/* End No result Found  */}

                    </div>
                </div>
            </section>
                    
    );
};

SchoolCenterListContainer.propTypes = {}

export default SchoolCenterListContainer
