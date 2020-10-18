
import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_FAMILY_SUCCESS, GET_FAMILY_FAILURE, GET_FAMILY_REQUEST } from '../../actions/types';

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
			} else {
				formData.append(key, payload[key]);
			}
		}
		const URL = `${url.getFamily}${urlBind}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_FAMILY_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_FAMILY_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_FAMILY_REQUEST, fetchData);
}

export default dataSaga;
