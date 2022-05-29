import initialState from './initialState';
import {
  GET_LIST_USERS_REQUEST,
  GET_LIST_USERS_SUCCESS,
  GET_LIST_USERS_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  GET_LIST_CHECKIN_CHECKOUT_REQUEST,
  GET_LIST_CHECKIN_CHECKOUT_SUCCESS,
  GET_LIST_CHECKIN_CHECKOUT_FAILURE,
  IMPORT_SUCCESS,
  IMPORT_REQUEST,
  IMPORT_FAILURE,
  DOWNLOAD_REQUEST,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAILURE,
  GET_CHECK_LIST_REQUEST,
  GET_CHECK_LIST_SUCCESS,
  GET_CHECK_LIST_FAILURE,
} from './constants';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case GET_LIST_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload.message,
      };
    case EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload.message,
      };
    case GET_LIST_CHECKIN_CHECKOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_CHECKIN_CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listCheckInCheckOut: action.payload,
      };
    case GET_LIST_CHECKIN_CHECKOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload.message,
      };
    case GET_CHECK_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CHECK_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        checkList: action.payload,
      };
    case GET_CHECK_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload.message,
      };
    case DOWNLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DOWNLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case DOWNLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.statusText,
      };

    case IMPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case IMPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case IMPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default reducer;
