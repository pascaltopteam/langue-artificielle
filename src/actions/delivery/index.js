// Delivery actions

import {
  GET_STORES_REQUEST,
  CREATE_CART_REQUEST,
  SEARCH_ADDRESS_REQUEST
} from '../types';

export const getStoresRequest = payload => {
	return { type: GET_STORES_REQUEST, payload };
};

export const createCartRequest = payload => {
	return { type: CREATE_CART_REQUEST, payload };
};

export const searchAddressRequest = payload => {
	return { type: SEARCH_ADDRESS_REQUEST, payload };
};