
import { put, takeEvery, call } from 'redux-saga/effects';
import { PASS_RESET_SUCCESS, PASS_RESET_FAILURE, PASS_RESET_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var formData = new FormData();
		for (var key in payload) {
			formData.append(key, payload[key]);
		}
		const URL = url.passReset;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
        const data = yield call(axiosInstance, sendData);
        
		yield put({
			type: PASS_RESET_SUCCESS,
			data
		});
	} catch (error) {
		 
		yield put({
			type: PASS_RESET_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(PASS_RESET_REQUEST, fetchData);
}

export default dataSaga;
