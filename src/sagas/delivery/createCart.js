import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAILURE 
} from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const URL = url.createCart;

		const sendData = {
			method: 'POST',
      url: URL,
			data: payload,
			headers: {
				Authorization: url.basic_auth
			}
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: CREATE_CART_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: CREATE_CART_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(CREATE_CART_REQUEST, fetchData);
}

export default dataSaga;
