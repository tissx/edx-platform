import { COURSE_PROGRAM_RECEIVED } from './actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_PROGRAM_RECEIVED:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
