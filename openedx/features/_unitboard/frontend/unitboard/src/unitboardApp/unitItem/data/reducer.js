import { UNIT_SETTINGS_RECEIVED } from './actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case UNIT_SETTINGS_RECEIVED:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
