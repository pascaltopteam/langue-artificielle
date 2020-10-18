import {
  GET_FAMILY_FAILURE,
	GET_FAMILY_REQUEST,
	GET_FAMILY_SUCCESS,
  SET_FAMILY_FAILURE,
	SET_FAMILY_REQUEST,
	SET_FAMILY_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
} from '../types';

export const getFamilyRequest = (payload) => {
	return { type: GET_FAMILY_REQUEST, payload };
};

export const getFamilySuccess = (data) => {
	return { type: GET_FAMILY_SUCCESS, data };
};

export const getFamilyFailure = (e) => {
	return { type: GET_FAMILY_FAILURE, e };
};

export const setFamilyRequest = (payload) => {
	return { type: SET_FAMILY_REQUEST, payload };
};

export const setFamilySuccess = (data) => {
	return { type: SET_FAMILY_SUCCESS, data };
};

export const setFamilyFailure = (e) => {
	return { type: SET_FAMILY_FAILURE, e };
};

export const updateProfileRequest = (payload) => {
	return { type: UPDATE_PROFILE_REQUEST, payload };
};

export const updateProfileSuccess = (data) => {
	return { type: UPDATE_PROFILE_SUCCESS, data };
};

export const updateProfileFailure = (e) => {
	return { type: UPDATE_PROFILE_FAILURE, e };
};