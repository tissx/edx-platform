import { UNITBOARD_SEARCH_CLEAN, UNITBOARD_SEARCH, UNITBOARD_ASSESSMENT_GRADED_DETAIL_RECEIVED, UNITBOARD_ASSPENDING_MARKER_DETAIL_RECEIVED, UNITBOARD_ASSESSMENT_ADMIN_DETAIL_RECEIVED } from './actionTypes';
import { customFilter } from "utils";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case UNITBOARD_SEARCH:
      return {"units": customFilter(action.meta, action.payload)};
    case UNITBOARD_SEARCH_CLEAN:
      state = {};
      return state;
    
    case UNITBOARD_ASSESSMENT_GRADED_DETAIL_RECEIVED:
    return action.payload.recived_assessment_graded_detail;

    case UNITBOARD_ASSPENDING_MARKER_DETAIL_RECEIVED:
    return action.payload.recived_assessment_pending_marker_detail;


    case UNITBOARD_ASSESSMENT_ADMIN_DETAIL_RECEIVED:
    return action.payload.assessment_admin_details;

    

    

    default:
      return state;
  }
};

export default reducer;
