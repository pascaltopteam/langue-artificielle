import {
  GET_RECIPE_BY_ID_REQUEST,
} from '../types';

export const getRecipeByIdRequest = (payload) => {
	return { type: GET_RECIPE_BY_ID_REQUEST, payload };
};