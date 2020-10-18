
import { put, takeEvery, call } from 'redux-saga/effects';
import { SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE, SOCIAL_LOGIN_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
  try {
    const { payload } = action;
    var formData = new FormData();
    for (var key in payload) {
      formData.append(key, payload[key]);
    }

    const URL = url.socialLogin;
    const sendData = {
      method: 'POST',
      url: URL,
      data: formData
    };
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: SOCIAL_LOGIN_SUCCESS,
      data
    });
  } catch (error) {
     
    yield put({
      type: SOCIAL_LOGIN_FAILURE,
      error
    });
  }
}

function* dataSaga() {
  yield takeEvery(SOCIAL_LOGIN_REQUEST, fetchData);
}

export default dataSaga;