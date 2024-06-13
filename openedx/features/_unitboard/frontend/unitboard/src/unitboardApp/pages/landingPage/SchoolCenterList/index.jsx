/**
 * School Center listing Page
 */


const SchoolCenterListContainer = ({schoolcenterList}) => {
  
    return (

        <section className="learn-school">
            <div className="container listing-container">
                <div className="py-5">
                    {/* <h1 className="theading-title">Learn from schools and centres</h1>
                    <p className="para">Welcome to TISS, a multi-campus, integrated, community engaged public university of India. As students you are now part of India’s foremost social science university founded in 1936 by Sir Dorabjee Tata Trust to create human service professionals for addressing.</p> */}
                </div>
                <div class="border-bottom"><h1 className="school-title">Schools/Independent Centres</h1></div>
                <div className="row mx-box p_tb" id="iconright">

                    {/* start Dynamic center  */}
                    {schoolcenterList['centers'].sort((a,b) => b.count - a.count).map((center) => (
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
                                    <p className="title p-3">{center.center_name}</p>
                                    <span className="school-center-label">Independent Centre</span>  
                                    {/* <div className="service-text position-relativ">
                                        <p className="text-school">{center.center_name}
                                        </p>
                                    </div> */}
                                </div>
                            </a>
                        </div>
                    ))} 

                    {/* End Dynamic center  */}

                    {/* start Dynamic schools */}

                    {schoolcenterList['schools'].sort((a,b) => b.count - a.count).map((school) => (
                    <div className="course-box">
                        <a className="mx-link" href={school.school_detail}>
                            <div className="service-item body-light tissxoff">
                                <div className="img_area">
                                    <img className="img-fluid sch_card" 
                                    src={school.image?school.image: '../static/tissx-theme/images/dummy/dummy_course1.png'}
                                    onError={(e) => {
                                        e.target.src ='../static/tissx-theme/images/dummy/dummy_course1.png' 
                                    }} alt=""/>
                                </div>
                                <p className="title p-3">{school.school_name}</p>
                                <span className="school-center-label">School</span>  
                            </div>
                        </a>
                    </div>

                    ))} 
                    {/* End Dynamic schools */}

                    {/* Start No result Found  */}
                    
                    {/* {schoolListData.count == 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Schools are not available.</div>
                    </div>
                    )} */}
                    {/* End No result Found  */}

            
                </div>
            </div>
        </section>

    );
};
// }


SchoolCenterListContainer.propTypes = {}

export default SchoolCenterListContainer
