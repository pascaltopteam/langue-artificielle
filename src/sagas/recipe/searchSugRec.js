
import { put, takeEvery, call } from 'redux-saga/effects';
import { SEARCH_SUG_REC_SUCCESS, SEARCH_SUG_REC_FAILURE, SEARCH_SUG_REC_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		for (var key in payload) {
			urlStr = `${urlStr}&${key}=${payload[key]}`;
		}
		const URL = `${url.searchSugRec}${urlStr}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: SEARCH_SUG_REC_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: SEARCH_SUG_REC_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(SEARCH_SUG_REC_REQUEST, fetchData);
}

export default dataSaga;
