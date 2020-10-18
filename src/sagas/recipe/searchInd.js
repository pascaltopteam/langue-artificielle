
import { put, takeEvery, call } from 'redux-saga/effects';
import { SEARCH_IND_SUCCESS, SEARCH_IND_FAILURE, SEARCH_IND_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		for (var key in payload) {
			urlStr = `${urlStr}&${key}=${payload[key]}`;
		}
		const URL = `${url.searchInd}${urlStr}`;

		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: SEARCH_IND_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: SEARCH_IND_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(SEARCH_IND_REQUEST, fetchData);
}

export default dataSaga;
