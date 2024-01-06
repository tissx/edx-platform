import React, { Fragment, useEffect } from "react";
// import UnitboardSearch from "./unitboardSearch";
// import Centered from "./components/Centered";
// import { useSelector, useDispatch } from "react-redux";
// import { unitDataFetching } from "./unitItem/data/actions";

// import { BrowserRouter as Router } from "react-router-dom";
// import { Switch, Route, Routes } from "react-router-dom";

import LandingPageContainer from "./pages/landingPage";

import "./unitboardApp.css"
export const UnitboardApp = () => {
    console.log("state.");
    // const unitItems = useSelector(state => state.unitItems);
    // const searchResults = useSelector((state) => state.unitboardSearch);
    // const gradedAssessmentListDetailTable = useSelector((state) => state.recived_assessment_graded_detail);
    // const assessmentSubmissionMarkerListDetail = useSelector((state) => state.recived_assessment_pending_marker_detail);
    // const assessmentadminListDetail = useSelector((state) => state.assessment_admin_details);
    


    // alert(assessmentSubmissionMarkerListDetail)
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(unitDataFetching());
    // }, []);

   

    return (

        <LandingPageContainer/>
       
        // <Router>
        //     <Switch>
        //         <Route exact path="/unitboard">

        // <Fragment>
        //     <Centered>
        //         {/* <AssessmentSubmissionMarkerdash /> */}
        //         {/* {!R.isEmpty(assessmentSubmissionMarkerListDetail) && <AssessmentSubmissionMarkerList assessmentSubmissionMarkerListDetail={assessmentSubmissionMarkerListDetail}/> } */}

        //         <AssessmentSubmissionMarker2List />
               
        //         <div  className="section-heading">Enrolled Units</div>
        //         <UnitboardSearch />
        //         {!R.isEmpty(searchResults) && <UnitboardSearchResults searchResults={searchResults} />}
        //         {!R.isEmpty(unitItems) && R.isEmpty(searchResults) && <UnitsList unitItems={unitItems} />}
        //     </Centered>
        //     <Notistack />
        //     <ModalWindow />
        // </Fragment>
        // </Route>
        //         <Route exact path="/unitboard/assessment-moderator-dashboard"><AssessmentSubmissionModeratorList/>
        //         {!R.isEmpty(gradedAssessmentListDetailTable) && <AssessmentSubmissionModeratorDetailList gradedAssessmentListDetail={gradedAssessmentListDetailTable}/> }
        //         </Route>

        //         <Route exact path="/unitboard/marker-dashboard"><AssessmentSubmissionMarkerdash/>
        //         {!R.isEmpty(assessmentSubmissionMarkerListDetail) && <AssessmentSubmissionMarkerList assessmentSubmissionMarkerListDetail={assessmentSubmissionMarkerListDetail}/> }
               
        //         </Route>

        //         <Route exact path="/unitboard/assessment-admin-dashboard"><AssessmentAdmindash/>
        //         {!R.isEmpty(assessmentadminListDetail) && <AssessmentAdminSubmissionList assessmentadminListDetail={assessmentadminListDetail}/> }
        //         </Route>
              
        // </Switch>
        // </Router>
    );
}

UnitboardApp.propTypes = {};

export default UnitboardApp;
