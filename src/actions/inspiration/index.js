// Inspiration actions

import {
  SEARCH_SUG_REC_REQUEST,
  GET_INSPIRATION_REQUEST
} from '../types';

export const searchInspirationRequest = (payload) => {
  return { type: SEARCH_SUG_REC_REQUEST, payload };
}

export const getInspirationRequest = payload => {
	return { type: GET_INSPIRATION_REQUEST, payload };
};