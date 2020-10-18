// Menu actions

import {
  GENERATE_MENU_REQUEST,
  ADD_TO_MENU_REQUEST,
  GET_MENU_REQUEST,
  DEL_MENU_REQUEST,
  EDIT_GUEST_REQUEST,
  GET_MENU_IND_REQUEST,
  REPLACE_MENU_REQUEST
} from '../types';

export const generateMenuRequest = payload => {
	return { type: GENERATE_MENU_REQUEST, payload };
};

export const addToMenuRequest = payload => {
	return { type: ADD_TO_MENU_REQUEST, payload };
};

export const getMenuRequest = (payload) => {
	return { type: GET_MENU_REQUEST, payload };
};

export const delMenuRequest = (payload) => {
	return { type: DEL_MENU_REQUEST, payload };
};

export const editGuestRequest = (payload) => {
	return { type: EDIT_GUEST_REQUEST, payload };
};

export const getMenuIndRequest = (payload) => {
	return { type: GET_MENU_IND_REQUEST, payload };
};

export const replaceMenuRequest = (payload) => {
	return { type: REPLACE_MENU_REQUEST, payload };
};