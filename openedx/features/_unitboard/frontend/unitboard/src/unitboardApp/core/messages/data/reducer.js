import * as R from 'ramda';
import { SNACKBAR_ENQUEUE, SNACKBAR_DESTROY } from './actionTypes';

const reducer = (messages = [], action) => {
  switch (action.type) {
    case SNACKBAR_ENQUEUE:
      return R.append(action.payload, messages);
    case SNACKBAR_DESTROY:
      return R.filter(m => m.key !== action.meta.key, messages);
    default:
      return messages;
  }
};

export default reducer;
