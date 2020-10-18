
import { put, takeEvery, call } from 'redux-saga/effects';
import { LIKE_DISLIKE_REC_SUCCESS, LIKE_DISLIKE_REC_FAILURE, LIKE_DISLIKE_REC_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var formData = new FormData();
		var urlBind = '';
		var typeUrl = 0; // 0=like 1=dislike
		for (var key in payload) {
			if (key == 'access_token') {
				urlBind = `&access_token=${payload[key]}`;
			}
			if (key == 'typeUrl') {
				typeUrl = payload[key] == 0 ? 0 : 1;
			} else {
				formData.append(key, payload[key]);
			}
		}
		const URL = typeUrl == 0 ? `${url.likeRec}${urlBind}` : `${url.dislikeRec}${urlBind}`;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: LIKE_DISLIKE_REC_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: LIKE_DISLIKE_REC_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(LIKE_DISLIKE_REC_REQUEST, fetchData);
}

export default dataSaga;
