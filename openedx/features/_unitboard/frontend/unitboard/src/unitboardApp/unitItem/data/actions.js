import {
  UNIT_SETTINGS_FAILURE,
  UNIT_SETTINGS_RECEIVED,
  UNIT_SETTINGS_REQUEST,
} from './actionTypes';
import { createAction } from 'redux-api-middleware';
import { apiUrls, makeHeaders } from 'setupAPI';


export const unitDataFetching = () =>
  createAction({
    endpoint: apiUrls.unit_items.items_info,
    method: 'GET',
    headers: makeHeaders(),
    types: [UNIT_SETTINGS_REQUEST, UNIT_SETTINGS_RECEIVED, UNIT_SETTINGS_FAILURE],
  });
