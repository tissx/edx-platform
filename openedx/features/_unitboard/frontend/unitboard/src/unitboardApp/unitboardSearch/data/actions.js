import {
  UNITBOARD_SEARCH,
  UNITBOARD_SEARCH_CLEAN,
  UNITBOARD_ASSESSMENT_GRADED_DETAIL_REQUEST,
  UNITBOARD_ASSESSMENT_GRADED_DETAIL_RECEIVED,
  UNITBOARD_ASSESSMENT_GRADED_DETAIL_FAILURE,
  UNITBOARD_ASSPENDING_MARKER_DETAIL_REQUEST,
  UNITBOARD_ASSPENDING_MARKER_DETAIL_RECEIVED,
  UNITBOARD_ASSPENDING_MARKER_DETAIL_FAILURE,
  UNITBOARD_ASSESSMENT_ADMIN_DETAIL_REQUEST, 
  UNITBOARD_ASSESSMENT_ADMIN_DETAIL_RECEIVED,
  UNITBOARD_ASSESSMENT_ADMIN_FAILURE

} from './actionTypes';

import { createAction } from 'redux-api-middleware';

import { apiUrls, makeHeaders, withParams } from 'setupAPI';

export const searchResultFetching = (searchQuery, meta) => ({
  type: UNITBOARD_SEARCH,
  payload: searchQuery,
  meta,
});

export const searchResultClean = () => ({
  type: UNITBOARD_SEARCH_CLEAN,
});



export const gradedAssessmentListDetailFetching = params =>
  createAction({
    endpoint: withParams(apiUrls.detail.get_graded_assessment_list_detail, params),
    // endpoint: withParams("/unitboard/api/detail/get-graded-assessment-list-detail/", params),

    
    method: 'GET',
    headers: makeHeaders(),
    types: [UNITBOARD_ASSESSMENT_GRADED_DETAIL_REQUEST, UNITBOARD_ASSESSMENT_GRADED_DETAIL_RECEIVED, UNITBOARD_ASSESSMENT_GRADED_DETAIL_FAILURE],
  });


export const pendingAssessmentMarkerDetailFetching = params =>
// alert(params);
createAction({
  endpoint: withParams(apiUrls.detail.get_pending_assessment_marker_detail, params),
  method: 'GET',
  headers: makeHeaders(),
  types: [UNITBOARD_ASSPENDING_MARKER_DETAIL_REQUEST, UNITBOARD_ASSPENDING_MARKER_DETAIL_RECEIVED, UNITBOARD_ASSPENDING_MARKER_DETAIL_FAILURE],
});


export const assessmentListFetching = params =>
createAction({
  endpoint: withParams(apiUrls.detail.admin_assessment_dash_detail, params),
  method: 'GET',
  headers: makeHeaders(),
  types: [UNITBOARD_ASSESSMENT_ADMIN_DETAIL_REQUEST, UNITBOARD_ASSESSMENT_ADMIN_DETAIL_RECEIVED, UNITBOARD_ASSESSMENT_ADMIN_FAILURE],
});