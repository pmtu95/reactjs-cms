import api from '../../../../common/axiosConfig';
import { request, success, failure } from '../../../../common/reduxActions';
import {
  GET_LIST_USERS_REQUEST,
  GET_LIST_USERS_SUCCESS,
  GET_LIST_USERS_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  EDIT_USER_REQUEST,
  GET_LIST_CHECKIN_CHECKOUT_REQUEST,
  GET_LIST_CHECKIN_CHECKOUT_SUCCESS,
  GET_LIST_CHECKIN_CHECKOUT_FAILURE,
  GET_CHECK_LIST_REQUEST,
  GET_CHECK_LIST_SUCCESS,
  GET_CHECK_LIST_FAILURE,
  SUBMIT_CHECKLIST_ITEM_REQUEST,
  SUBMIT_CHECKLIST_ITEM_SUCCESS,
  SUBMIT_CHECKLIST_ITEM_FAILURE,
} from '../constants';
import authActions from '../../../auth/redux/actions';

const apiUrl = process.env.REACT_APP_API_URL;

const getListUsers = () => {
  return (dispatch) => {
    dispatch(request(GET_LIST_USERS_REQUEST));
    return api()
      .get('users')
      .then((res) => {
        console.log(res);
        dispatch(success(GET_LIST_USERS_SUCCESS, res.data));
        dispatch(authActions.updateAuthorization(res.headers));
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(GET_LIST_USERS_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const editUser = (userId, data) => {
  return (dispatch) => {
    dispatch(request(EDIT_USER_REQUEST));
    return api()
      .put('users/' + userId, data)
      .then((res) => {
        dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(EDIT_USER_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const lockUser = (userId) => {
  return (dispatch) => {
    dispatch(request(EDIT_USER_REQUEST));
    return api()
      .post(`users/${userId}/lock`, {})
      .then((res) => {
        dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(EDIT_USER_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const unlockUser = (userId) => {
  return (dispatch) => {
    dispatch(request(EDIT_USER_REQUEST));
    return api()
      .post(`users/${userId}/unlock`, {})
      .then((res) => {
        dispatch(success(EDIT_USER_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(EDIT_USER_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const getCheckInCheckOut = (date) => {
  console.log(date);
  const dateFrom = date.length > 0 ? date[0] : '';
  const dateTo = date.length > 1 ? date[1] : '';
  return (dispatch) => {
    dispatch(request(GET_LIST_CHECKIN_CHECKOUT_REQUEST));
    return api()
      .get(`checkin_checkouts?date_from=${dateFrom}&date_to=${dateTo}`)
      .then((res) => {
        res.data = res.data.map((data) => {
          data.key = data.id;
          return data;
        });
        res.data.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        dispatch(success(GET_LIST_CHECKIN_CHECKOUT_SUCCESS, res.data));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          dispatch(authActions.logout());
        }
        const { status } = error.response;
        dispatch(failure(GET_LIST_CHECKIN_CHECKOUT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const getCheckListById = (checkListId) => {
  return (dispatch) => {
    dispatch(request(GET_CHECK_LIST_REQUEST));
    return api()
      .get(`checklists/${checkListId}`)
      .then((res) => {
        console.log(res);

        const data = {
          ...res.data,
          checklist_items: res.data.checklist_items.map((item) => {
            return {
              ...item,
              photos: item.photos
                ? item.photos.map((photo) => {
                    return {
                      ...photo,
                      uri: `${apiUrl}${photo.image}`,
                    };
                  })
                : [],
            };
          }),
        };
        dispatch(success(GET_CHECK_LIST_SUCCESS, data));
        dispatch(authActions.updateAuthorization(res.headers));
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;
        dispatch(failure(GET_CHECK_LIST_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const submitChecklistItem = (itemId, payload) => {
  console.log(payload);
  return (dispatch) => {
    dispatch(request(SUBMIT_CHECKLIST_ITEM_REQUEST));
    return api()
      .post(`checklist_items/${itemId}`, payload)
      .then((res) => {
        console.log(res);
        dispatch(success(SUBMIT_CHECKLIST_ITEM_SUCCESS));
        dispatch(authActions.updateAuthorization(res.headers));
      })
      .catch((error) => {
        console.log(error);
        const { status } = error.response;
        dispatch(failure(SUBMIT_CHECKLIST_ITEM_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const homeActions = {
  getListUsers,
  editUser,
  lockUser,
  unlockUser,
  getCheckInCheckOut,
  getCheckListById,
  submitChecklistItem,
};

export default homeActions;
