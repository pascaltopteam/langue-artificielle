// Auth Actions

import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	AUTO_LOGIN_REQUEST,
	AUTO_LOGIN_SUCCESS,
	AUTO_LOGIN_FAILURE,
	RESET_USER_TOKEN,
	UPDATE_USER_PROFILE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	SOCIAL_LOGIN_REQUEST,
	SOCIAL_LOGIN_SUCCESS,
	SOCIAL_LOGIN_FAILURE,
	GET_RECIPE_SUG_FAILURE,
	GET_RECIPE_SUG_REQUEST,
	GET_RECIPE_SUG_SUCCESS,
	CONTACT_FAILURE,
	CONTACT_REQUEST,
	CONTACT_SUCCESS,
	PASS_RESET_REQUEST,
	PASS_RESET_SUCCESS,
	PASS_RESET_FAILURE,
	PASS_CODE_REQUEST,
	PASS_CODE_SUCCESS,
	PASS_CODE_FAILURE,
	SEARCH_IND_FAILURE,
	SEARCH_IND_REQUEST,
	SEARCH_IND_SUCCESS,
	SEARCH_SUG_REC_FAILURE,
	SEARCH_SUG_REC_REQUEST,
	SEARCH_SUG_REC_SUCCESS,
	LIKE_DISLIKE_REC_FAILURE,
	LIKE_DISLIKE_REC_REQUEST,
	LIKE_DISLIKE_REC_SUCCESS,
	GET_RECIPE_BY_ID_FAILURE,
	GET_RECIPE_BY_ID_REQUEST,
	GET_RECIPE_BY_ID_SUCCESS,
	ADD_TO_MENU_REQUEST,
	ADD_TO_MENU_SUCCESS,
	ADD_TO_MENU_FAILURE,
	GET_MENU_IND_FAILURE,
	GET_MENU_IND_REQUEST,
	GET_MENU_IND_SUCCESS
} from './types';

export const loginRequest = (payload) => {
	return { type: LOGIN_REQUEST, payload };
};

export const loginSuccess = (data) => {
	return { type: LOGIN_SUCCESS, data };
};

export const loginFailure = (e) => {
	return { type: LOGIN_FAILURE, e };
};

export const autoLoginRequest = (payload) => {
	return { type: AUTO_LOGIN_REQUEST, payload };
};

export const autoLoginSuccess = (data) => {
	return { type: AUTO_LOGIN_SUCCESS, data };
};

export const autoLoginFailure = (e) => {
	return { type: AUTO_LOGIN_FAILURE, e };
};

export const resetUserToken = () => {
	return { type: RESET_USER_TOKEN };
};

export const updateUserProfile = payload => {
	return { type: UPDATE_USER_PROFILE, payload };
}

export const passResetRequest = (payload) => {
	return { type: PASS_RESET_REQUEST, payload };
};

export const passResetSuccess = (data) => {
	return { type: PASS_RESET_SUCCESS, data };
};

export const passResetFailure = (e) => {
	return { type: PASS_RESET_FAILURE, e };
};

export const passCodeRequest = (payload) => {
	return { type: PASS_CODE_REQUEST, payload };
};

export const passCodeSuccess = (data) => {
	return { type: PASS_CODE_SUCCESS, data };
};

export const passCodeFailure = (e) => {
	return { type: PASS_CODE_FAILURE, e };
};

export const registerRequest = (payload) => {
	return { type: REGISTER_REQUEST, payload };
};

export const registerSuccess = (data) => {
	return { type: REGISTER_SUCCESS, data };
};

export const registerFailure = (e) => {
	return { type: REGISTER_FAILURE, e };
};

export const socialLoginRequest = (payload) => {
	return { type: SOCIAL_LOGIN_REQUEST, payload };
};

export const socialLoginSuccess = (data) => {
	return { type: SOCIAL_LOGIN_SUCCESS, data };
};

export const socialLoginFailure = (e) => {
	return { type: SOCIAL_LOGIN_FAILURE, e };
};

export const getRecipeSugRequest = (payload) => {
	return { type: GET_RECIPE_SUG_REQUEST, payload };
};

export const getRecipeSugSuccess = (data) => {
	return { type: GET_RECIPE_SUG_SUCCESS, data };
};

export const getRecipeSugFailure = (e) => {
	return { type: GET_RECIPE_SUG_FAILURE, e };
};

export const getRecipeByIdRequest = (payload) => {
	return { type: GET_RECIPE_BY_ID_REQUEST, payload };
};

export const getRecipeByIdSuccess = (data) => {
	return { type: GET_RECIPE_BY_ID_SUCCESS, data };
};

export const getRecipeByIdFailure = (e) => {
	return { type: GET_RECIPE_BY_ID_FAILURE, e };
};

export const contactRequest = (payload) => {
	return { type: CONTACT_REQUEST, payload };
};

export const contactSuccess = (data) => {
	return { type: CONTACT_SUCCESS, data };
};

export const contactFailure = (e) => {
	return { type: CONTACT_FAILURE, e };
};

export const searchIndRequest = (payload) => {
	return { type: SEARCH_IND_REQUEST, payload };
};

export const searchIndSuccess = (data) => {
	return { type: SEARCH_IND_SUCCESS, data };
};

export const searchIndFailure = (e) => {
	return { type: SEARCH_IND_FAILURE, e };
};

export const searchSugRecRequest = (payload) => {
	return { type: SEARCH_SUG_REC_REQUEST, payload };
};

export const searchSugRecSuccess = (data) => {
	return { type: SEARCH_SUG_REC_SUCCESS, data };
};

export const searchSugRecFailure = (e) => {
	return { type: SEARCH_SUG_REC_FAILURE, e };
};

export const likeDislikeRecRequest = (payload) => {
	return { type: LIKE_DISLIKE_REC_REQUEST, payload };
};

export const likeDislikeRecSuccess = (data) => {
	return { type: LIKE_DISLIKE_REC_SUCCESS, data };
};

export const likeDislikeRecFailure = (e) => {
	return { type: LIKE_DISLIKE_REC_FAILURE, e };
};

export const addToMenuRequest = (payload) => {
	return { type: ADD_TO_MENU_REQUEST, payload };
};

export const addToMenuSuccess = (data) => {
	return { type: ADD_TO_MENU_SUCCESS, data };
};

export const addToMenuFailure = (e) => {
	return { type: ADD_TO_MENU_FAILURE, e };
};

export const getMenuIndRequest = (payload) => {
	return { type: GET_MENU_IND_REQUEST, payload };
};

export const getMenuIndSuccess = (data) => {
	return { type: GET_MENU_IND_SUCCESS, data };
};

export const getMenuIndFailure = (e) => {
	return { type: GET_MENU_IND_FAILURE, e };
};
