import {
  COURSE_PROGRAM_FAILURE,
  COURSE_PROGRAM_RECEIVED,
  COURSE_PROGRAM_REQUEST,
} from './actionTypes';
import { createAction } from 'redux-api-middleware';
import { apiUrls, makeHeaders } from 'setupAPI';

// courseProgramDegreeReducer
// export const unitDataFetching = () =>
export const courseProgramDataFetching = () =>
  createAction({
    endpoint: apiUrls.landing_page.course_program,
    method: 'GET',
    headers: makeHeaders(),
    types: [COURSE_PROGRAM_REQUEST, COURSE_PROGRAM_RECEIVED, COURSE_PROGRAM_FAILURE],
  });
