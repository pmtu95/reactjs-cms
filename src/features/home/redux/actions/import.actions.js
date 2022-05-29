import api from '../../../../common/axiosConfig';
import { request, success, failure } from '../../../../common/reduxActions';
import { IMPORT_SUCCESS, IMPORT_REQUEST, IMPORT_FAILURE } from '../constants';
import authActions from '../../../auth/redux/actions';

const uploadStocks = (data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/stock_import', data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadChecklists = (data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/checklist_import', data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadChecklistItems = (data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/checklist_item_import', data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadFull = (data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/master_import', data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadPhotos = (data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api('multipart/form-data')
      .post('io/photo_import', data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const uploadUsers = (data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api()
      .post('io/user_import', data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const importData = (type, data) => {
  return (dispatch) => {
    dispatch(request(IMPORT_REQUEST));
    return api()
      .post(`io/import/${type}`, data)
      .then((res) => {
        dispatch(success(IMPORT_SUCCESS, res.status));
        dispatch(authActions.updateAuthorization(res.headers));
        console.log(res);
      })
      .catch((error) => {
        const { status } = error.response;
        dispatch(failure(IMPORT_FAILURE, error.response));
        if (status === 401 || status === 500) {
          dispatch(authActions.logout());
        }
      });
  };
};

const importActions = {
  uploadStocks,
  uploadChecklists,
  uploadChecklistItems,
  uploadFull,
  uploadUsers,
  uploadPhotos,
  importData,
};

export default importActions;
