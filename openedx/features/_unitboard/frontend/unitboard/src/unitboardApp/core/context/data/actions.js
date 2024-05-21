import { CONTEXT_AVAILABLE } from './actionTypes';


export const contextAvailable = data => ({
  type: CONTEXT_AVAILABLE,
  payload: data,
});
