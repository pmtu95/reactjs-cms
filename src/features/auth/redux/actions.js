import api from '../../../common/axiosConfig';
import { request, success, failure } from '../../../common/reduxActions';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  UPDATE_AUTH_HEADERS,
} from './constants';
import history from '../../../common/history';

const login = (data) => {
  return (dispatch) => {
    dispatch(request(AUTH_LOGIN_REQUEST));
    return api()
      .post('login', data)
      .then((res) => {
        console.log(res);
        const data = {
          user: res.data,
          headers: {
            Authorization: res.headers['authorization'],
          },
        };
        dispatch(success(AUTH_LOGIN_SUCCESS, data));
        history.go('/');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const updateAuthorization = (headers) => {
  return (dispatch) => {
    dispatch(success(UPDATE_AUTH_HEADERS, headers['authorization']));
  };
};

const logout = () => {
  return (dispatch) => {
    return api()
      .get('logout')
      .then((res) => {
        console.log(res);
        const data = {};
        dispatch(success(AUTH_LOGOUT, data));
        window.location.reload(false);
        localStorage.removeItem('persist:root');
        history.go('/auth/login');
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 401 || status === 500) {
          localStorage.removeItem('persist:root');
          history.go('/auth/login');
        }
      });
  };
};

const register = (data) => {
  return (dispatch) => {
    return api()
      .post('users', data)
      .then((res) => {
        console.log(res);
        dispatch(updateAuthorization(res.headers));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const getUserDetails = () => {
  return (dispatch) => {
    return api()
      .get('users')
      .then((res) => {
        console.log(res);
        dispatch(updateAuthorization(res.headers));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const authActions = {
  login,
  logout,
  register,
  getUserDetails,
  updateAuthorization,
};

export default authActions;
