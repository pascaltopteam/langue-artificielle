
import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_RECIPE_BY_ID_SUCCESS, GET_RECIPE_BY_ID_FAILURE, GET_RECIPE_BY_ID_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		
		for (var key in payload) {
			urlStr = `${urlStr}&${key}=${payload[key]}`;
		}
		const URL = `${url.getRecipeById}${urlStr}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_RECIPE_BY_ID_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_RECIPE_BY_ID_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_RECIPE_BY_ID_REQUEST, fetchData);
}

export default dataSaga;
