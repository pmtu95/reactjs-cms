import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import authReducer from '../features/auth/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// NOTE 2: always use the camel case of the feature folder name as the store branch name

const reducerMap = {
  router: connectRouter(history),
  home: homeReducer,
  common: commonReducer,
  auth: authReducer,
};

const appReducer = combineReducers(reducerMap);

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
