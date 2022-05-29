import initialState from './initialState';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UPDATE_AUTH_HEADERS,
} from './constants';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        loggedIn: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        ...action.payload,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        errorMessage: action.payload.statusText,
      };
    case UPDATE_AUTH_HEADERS:
      return {
        ...state,
        headers: {
          ...state.headers,
          Authorization: action.payload,
        },
      };

    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
