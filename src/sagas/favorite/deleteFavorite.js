
import { put, takeEvery, call } from 'redux-saga/effects';
import { DELETE_FAVORITE_SUCCESS, DELETE_FAVORITE_FAILURE, DELETE_FAVORITE_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const { access_token, uid } = payload;
		const URL = `${url.deleteFavorite}&access_token=${access_token}`;

		var formData = new FormData();
		formData.append("uid", uid);

		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: DELETE_FAVORITE_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: DELETE_FAVORITE_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(DELETE_FAVORITE_REQUEST, fetchData);
}

export default dataSaga;
