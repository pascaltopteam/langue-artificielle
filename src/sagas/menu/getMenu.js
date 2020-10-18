
import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_MENU_SUCCESS, GET_MENU_FAILURE, GET_MENU_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const { access_token } = payload;
		const URL = `${url.getMenu}&access_token=${access_token}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_MENU_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_MENU_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_MENU_REQUEST, fetchData);
}

export default dataSaga;
