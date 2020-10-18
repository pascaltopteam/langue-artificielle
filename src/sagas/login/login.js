
import { put, takeEvery, call } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		payloadJson = '';
		var formData = new FormData();
		for (var key in payload) {
			formData.append(key, payload[key]);
		}
		const URL = url.login;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: LOGIN_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: LOGIN_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(LOGIN_REQUEST, fetchData);
}

export default dataSaga;
