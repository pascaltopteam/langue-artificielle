
import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_INSPIRATION_REQUEST, GET_INSPIRATION_SUCCESS, GET_INSPIRATION_FAILURE } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		
		for (var key in payload) {
			urlStr = `${urlStr}&${key}=${payload[key]}`;
		}
		const URL = `${url.getInspiration}${urlStr}`;

		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_INSPIRATION_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_INSPIRATION_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_INSPIRATION_REQUEST, fetchData);
}

export default dataSaga;
