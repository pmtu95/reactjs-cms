import api from '../../../../common/axiosConfig';
import { request, success, failure } from '../../../../common/reduxActions';
import { DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAILURE } from '../constants';
import authActions from '../../../auth/redux/actions';
import downloadXlsFromBase64 from '../../../../common/download';

const exportData = (options) => {
  return (dispatch) => {
    dispatch(request(DOWNLOAD_REQUEST));
    return api()
      .get(
        `io/export/${options.type}?date_from=${options.date_from}&date_to=${options.date_to}&user_id=${options.user_id}&yearweek=${options.yearweek}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(success(DOWNLOAD_SUCCESS, { message: 'Download success' }));
        dispatch(authActions.updateAuthorization(res.headers));
        downloadXlsFromBase64(res.data, options.type, 'xls');
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;
          dispatch(failure(DOWNLOAD_FAILURE, error.response));

          if (status === 401 || status === 500) {
            dispatch(authActions.logout());
          }
        }
      });
  };
};

const downloadActions = {
  exportData,
};

export default downloadActions;
