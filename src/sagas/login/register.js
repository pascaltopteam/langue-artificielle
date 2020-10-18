
import { put, takeEvery, call } from 'redux-saga/effects';
import { REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
  try {
    const { payload } = action;
    var formData = new FormData();
    for (var key in payload) {
      formData.append(key, payload[key]);
    }

    const URL = url.register;
    const sendData = {
      method: 'POST',
      url: URL,
      data: formData
    };
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: REGISTER_SUCCESS,
      data
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      error
    });
  }
}

function* dataSaga() {
  yield takeEvery(REGISTER_REQUEST, fetchData);
}

export default dataSaga;