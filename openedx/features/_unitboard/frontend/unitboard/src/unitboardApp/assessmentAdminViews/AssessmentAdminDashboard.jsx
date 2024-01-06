import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import './assessment-admin-dash.css';

import {assessmentListFetching} from "../unitboardSearch/data/actions"
import {connect} from 'react-redux'


class AssessmentAdmindash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSubmissionsLoaded: true,
      submissionsList: Immutable.List(),
      fromDate: '',
      toDate: '',
      dateRange: ''
    };
    // this.render_grading_form = this.render_grading_form.bind(this)
    this.paginationLoadMore = this.paginationLoadMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.setSubmissionsData = this.setSubmissionsData.bind(this);
    this.assessmentListFetching = this.assessmentListFetching.bind(this);

  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  search = () => {
    // TODO: Put the search functionality for filters here
  }

  assessmentListFetching = (courseid, itemid) => {
    this.props.sendTheAlert(courseid, itemid)
  }

  paginationLoadMore = () => {
    fetch(this.state.apiFetchMoreSubmissionsUrl, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => this.setSubmissionsData(json['results'], json['next']))
  }

  fetchSubmissionsData = () => {
    fetch(this.state.apiFetchMoreSubmissionsUrl, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => this.setSubmissionsData(json['results'], json['next']))
  }
  componentDidMount() {
    fetch('/unitboard/api/testing/').then(response => response.json())
      .then(json => this.setSubmissionsData(json['results'], json['next']))
  }

  setSubmissionsData = (results, paginationNext) => {
    const tempSubmissions = this.state.submissionsList.concat(Immutable.fromJS(results));
    this.setState({
      allSubmissionsLoaded: paginationNext === null,
      submissionsList: tempSubmissions,
      apiFetchMoreSubmissionsUrl: paginationNext
    })
  }
  render() {
    let submissionsRender = <h6 style={{ 'text-align': 'center' }}>Some error occured"</h6>

    try {
      submissionsRender = this.state.submissionsList.size > 0 ? this.state.submissionsList.map((submission, index) => {
        return (
          <li key={index} className='learner-row'>
            <span className='name'>{submission.getIn(['course_name'])}</span>
            <span className='name stat-number'><a className='graded-assessement-link' onClick={()=> this.assessmentListFetching(submission.getIn(['course_id']), 
            submission.getIn(['graded_assessment_count', 'item_id'])
            )} >    
              {submission.getIn(['graded_assessment_count', 'count']) + submission.getIn(['workflow_statistics'])}</a>
            </span>
            <span className='name stat-number'>{submission.getIn(['pending_assessments'])}</span>
            <span className='name stat-number'>{submission.getIn(['workflow_statistics'])}</span>
            <span className='name stat-number'>{submission.getIn(['unreleased_assessment_count', 'count'])}</span>
            
          </li>
        )
      }) : <h6 style={{ 'text-align': 'center' }}>Nothing to display.</h6>
    }
    catch (err) {
      console.log("some error occured while parsing data")
    }
    if (this.state.submissionsList.size > 0) {
      return (
        <>
                  {/* <div className='section-heading'>
                  Assessment Admin Dashboard
                </div> */}
        {/* <div className='section-heading'>Marker Dashboard</div> */}
          <div className='submission-list-container collapsible-course-description'>

            <section className='assessment-submissions-list'>
            
              <div className='header'>
                <div className='section-heading'>
                  Assessment Admin Dashboard
                </div>

              </div>
              <div className='stat-card'>
                <ul className='learners-table'>
                  <li key="header" className='header-row'>
                    <span className='name'>Course Name</span>
                    <span className='name stat-number'>Total Submissions</span>
                    <span className='name stat-number'>Pending for Evaluation</span>
                    <span className='name stat-number'>Pending for Moderation</span>
                    <span className='name stat-number'>Pending for Release Grade</span>
                   
                  </li>
                  {submissionsRender}
                </ul>
                {!this.state.allSubmissionsLoaded && <button className='load-more-button' onClick={() => this.paginationLoadMore()}>Load more</button>}
              </div>
            </section>
          </div>
          <hr className='section-break' />
        </>
      )
    }
    else {
      return <></>
    }
  }
}

AssessmentAdmindash.propTypes = {
  courseId: PropTypes.string,
};

// export default AssessmentAdmindash;

function mapDispatchToProps(dispatch) {

  return({
      sendTheAlert: (courseid, itemid) => {dispatch(assessmentListFetching({courseid: courseid, itemid: itemid }))}
  })
}
export default connect(null, mapDispatchToProps)(AssessmentAdmindash);
