import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as R from "ramda";

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Routes } from "react-router-dom";

import LandingPageContainer from "./pages/landingPage";
import ProgramDetailContainer from "./pages/programDetail";
import ProgramDegreelistingContainer from "./pages/programandDegreelisting";
import SchoolCenterlistingContainer from "./pages/schoolandCenterlisting";
import CenterDeatilContainer from "./pages/centerDetail";
import SchoolDeatilContainer from "./pages/schoolDetail";
import SearchPageContainer from "./pages/searchPage";

import "./unitboardApp.css"
export const UnitboardApp = () => {
    const { my_discovery_url } = useSelector(state => state.initialContext);
 

    return (

        <Router>
            <Switch>

                <Route exact path="/">
                {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <LandingPageContainer my_discovery_url={my_discovery_url} />}
                </Route>

                <Route exact path="/unitboard">
                {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <LandingPageContainer my_discovery_url={my_discovery_url} />}
       
                </Route>
                <Route exact path="/program-detail/:slug">
                    {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <ProgramDetailContainer my_discovery_url={my_discovery_url} />}

                </Route>

                <Route exact path="/unitboard/program-degree-listing">
                    {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <ProgramDegreelistingContainer my_discovery_url={my_discovery_url} />}
                </Route>

                <Route exact path="/school-center-listing">
                    {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <SchoolCenterlistingContainer my_discovery_url={my_discovery_url} />}
                </Route>

                <Route exact path="/center-detail/:slug">
                    {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <CenterDeatilContainer my_discovery_url={my_discovery_url} />}
                </Route>

                <Route exact path="/school-detail/:slug">
                    {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <SchoolDeatilContainer my_discovery_url={my_discovery_url} />}
                </Route>

                <Route exact path="/search-detail">
                    {!R.isEmpty(my_discovery_url) &&  my_discovery_url !== undefined && <SearchPageContainer my_discovery_url={my_discovery_url} />}
                </Route>
              


                
        </Switch>
        </Router>
    );
}

UnitboardApp.propTypes = {};

export default UnitboardApp;
