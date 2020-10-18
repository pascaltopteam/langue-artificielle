import { put, takeEvery, call } from 'redux-saga/effects';
import { SEARCH_ADDRESS_SUCCESS, SEARCH_ADDRESS_FAILURE, SEARCH_ADDRESS_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
    const URL = `${url.searchAddress}${payload}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: SEARCH_ADDRESS_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: SEARCH_ADDRESS_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(SEARCH_ADDRESS_REQUEST, fetchData);
}

export default dataSaga;
