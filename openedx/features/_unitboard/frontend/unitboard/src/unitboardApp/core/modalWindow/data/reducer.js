import { MODAL_WINDOW_OPEN, MODAL_WINDOW_CLOSED } from './actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MODAL_WINDOW_OPEN:
      return { ...state, open: true, body: action.payload };
    case MODAL_WINDOW_CLOSED:
      return { ...state, open: false, body: null };
    default:
      return state;
  }
};

export default reducer;
