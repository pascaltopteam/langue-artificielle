// Favorite actions

import {
  FAVORITE_REQUEST,
  UPDATE_FAVORITE_REQUEST,
  SEARCH_FEV_REC_REQUEST,
  DELETE_FAVORITE_REQUEST
} from '../types';

export const getFavoritesRequest = payload => {
	return { type: FAVORITE_REQUEST, payload };
};

export const updateFavoriteRequest = payload => {
	return { type: UPDATE_FAVORITE_REQUEST, payload };
};

export const searchFevRecRequest = (payload) => {
	return { type: SEARCH_FEV_REC_REQUEST, payload };
};

export const deleteFavoriteRequest = payload => {
  return { type: DELETE_FAVORITE_REQUEST, payload };
}