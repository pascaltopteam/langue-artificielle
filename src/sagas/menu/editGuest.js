
import { put, takeEvery, call } from 'redux-saga/effects';
import { EDIT_GUEST_SUCCESS, EDIT_GUEST_FAILURE, EDIT_GUEST_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		var formData = new FormData();
		for (var key in payload) {
			if (key == 'access_token') {
				urlStr = `&access_token=${payload[key]}`;
			} else {
				formData.append(key, payload[key]);
			}
		}
		const URL = `${url.editGuest}${urlStr}`;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: EDIT_GUEST_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: EDIT_GUEST_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(EDIT_GUEST_REQUEST, fetchData);
}

export default dataSaga;
