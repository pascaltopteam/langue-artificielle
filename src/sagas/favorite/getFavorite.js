
import { put, takeEvery, call } from 'redux-saga/effects';
import { FAVORITE_SUCCESS, FAVORITE_FAILURE, FAVORITE_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const { access_token } = payload;
		const URL = `${url.favorite}&access_token=${access_token}`;
		const sendData = {
			method: 'POST',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: FAVORITE_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: FAVORITE_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(FAVORITE_REQUEST, fetchData);
}

export default dataSaga;
