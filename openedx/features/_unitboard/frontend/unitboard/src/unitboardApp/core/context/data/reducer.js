import { CONTEXT_AVAILABLE } from './actionTypes';

const reducer = (context = {}, action) => {
  switch (action.type) {
    case CONTEXT_AVAILABLE:
      return action.payload;
    default:
      return context;
  }
};

export default reducer;
