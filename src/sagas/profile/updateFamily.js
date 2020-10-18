
import { put, takeEvery, call } from 'redux-saga/effects';
import { SET_FAMILY_SUCCESS, SET_FAMILY_FAILURE, SET_FAMILY_REQUEST } from '../../actions/types';

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
        const URL = `${url.setFamily}${urlBind}`;
        
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: SET_FAMILY_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: SET_FAMILY_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(SET_FAMILY_REQUEST, fetchData);
}

export default dataSaga;
