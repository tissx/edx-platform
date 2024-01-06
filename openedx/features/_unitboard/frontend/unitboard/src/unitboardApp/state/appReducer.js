import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contextReducer from '../core/context/data/reducer';
import messagesReducer from '../core/messages/data/reducer';
import modalWindowReducer from '../core/modalWindow/data/reducer';

import courseProgramDegreeReducer from '../pages/landingPage/data/reducer';
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),

    // CORE:
    initialContext: contextReducer,
    messages: messagesReducer,
    modalWindow: modalWindowReducer,

 
    courseProgramDegree: courseProgramDegreeReducer,

  });

export default createRootReducer;
