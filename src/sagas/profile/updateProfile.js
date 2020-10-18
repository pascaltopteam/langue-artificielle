
import { put, takeEvery, call } from 'redux-saga/effects';
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var formData = new FormData();
		var urlBind = '';
		for (var key in payload) {
			if (key == 'access_token') {
				urlBind = `&access_token=${payload[key]}`;
			} else if (typeof payload[key] == 'object') {
				payload[key].map((itm, ind) => {
					formData.append(`${key}[${ind}]`, itm);
				});
			} else {
				formData.append(key, payload[key]);
			}
		}
		const URL = `${url.updateProfile}${urlBind}`;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: UPDATE_PROFILE_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: UPDATE_PROFILE_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(UPDATE_PROFILE_REQUEST, fetchData);
}

export default dataSaga;
