// Auth Reducer

import AsyncStorage from '@react-native-community/async-storage';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	AUTO_LOGIN_REQUEST,
	AUTO_LOGIN_SUCCESS,
	AUTO_LOGIN_FAILURE,
	PASS_REST_REQUEST,
	PASS_REST_SUCCESS,
	PASS_REST_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	SOCIAL_LOGIN_REQUEST,
	SOCIAL_LOGIN_SUCCESS,
	SOCIAL_LOGIN_FAILURE,
	UPDATE_USER_PROFILE,
	RESET_USER_TOKEN,
	GET_RECIPE_SUG_FAILURE,
	GET_RECIPE_SUG_SUCCESS,
	GET_RECIPE_SUG_REQUEST,
	CONTACT_FAILURE,
	CONTACT_SUCCESS,
	CONTACT_REQUEST,
	PASS_RESET_SUCCESS,
	PASS_RESET_REQUEST,
	PASS_RESET_FAILURE,
	PASS_CODE_SUCCESS,
	PASS_CODE_REQUEST,
	PASS_CODE_FAILURE,
	DEL_MENU_REQUEST,
	DEL_MENU_SUCCESS,
	DEL_MENU_FAILURE,
	SEARCH_IND_FAILURE,
	SEARCH_IND_REQUEST,
	SEARCH_IND_SUCCESS,
	LIKE_DISLIKE_REC_FAILURE,
	LIKE_DISLIKE_REC_REQUEST,
	LIKE_DISLIKE_REC_SUCCESS,
	EDIT_GUEST_REQUEST,
	EDIT_GUEST_SUCCESS,
	EDIT_GUEST_FAILURE,
	ADD_TO_MENU_FAILURE,
	ADD_TO_MENU_REQUEST,
	ADD_TO_MENU_SUCCESS,
} from '../actions/types';

const initialState = {
	isWaiting: false,
	accessToken: null,
	id: 0,
	eMessage: '',
	loginError: null,
	registerError: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, isWaiting: true };

		case LOGIN_SUCCESS:
			const { data } = action.data;
			AsyncStorage.setItem('@access_token', data.autologin_token);
			return {
				...state,
				accessToken: data.autologin_token,
				isWaiting: false,
				userData: data,
				//menuArr:action.data.data.meal_plans,
				loginError: null
			};

		case LOGIN_FAILURE:
			return { 
				...state, 
				loginError: action.error.response.data, 
				isWaiting: false 
			};

		case PASS_REST_REQUEST:
			return { ...state, isWaiting: true, isResetPass: false };

		case PASS_REST_SUCCESS:
			return {
				...state,
				isWaiting: false,
				eMessage: '',
				isResetPass: true
			};

		case PASS_REST_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, isResetPass: false };

		case PASS_CODE_REQUEST:
			return { ...state, isWaiting: true, isPassCode: false };

		case PASS_CODE_SUCCESS:
			return {
				...state,
				isWaiting: false,
				eMessage: '',
				isPassCode: true
			};

		case PASS_CODE_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, isPassCode: false };

		case AUTO_LOGIN_REQUEST:
			return { ...state, isWaiting: true };

		case AUTO_LOGIN_SUCCESS:
			AsyncStorage.setItem('@access_token', action.data.data.autologin_token);
			return {
				...state,
				accessToken: action.data.data.autologin_token,
				isWaiting: false,
				userData: action.data.data,
				//menuArr:action.data.data.meal_plans,
				eMessage: ''
			};

		case AUTO_LOGIN_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false };

		case REGISTER_REQUEST:
			return { ...state, isWaiting: true };

		case REGISTER_SUCCESS:
			AsyncStorage.setItem('@access_token', action.data.data.autologin_token);
			return {
				...state,
				id: action.data.data.id,
				accessToken: action.data.data.autologin_token,
				isWaiting: false,
				userData: action.data.data,
				registerError: null
			};

		case REGISTER_FAILURE:
			return { ...state, registerError: action.error.response.data, isWaiting: false };

		case PASS_RESET_REQUEST:
			return { ...state, isWaiting: true, isChangePass: false };

		case PASS_RESET_SUCCESS:
			return {
				...state,
				eMessage: '',
				isWaiting: false,
				isChangePass: true
			};

		case PASS_RESET_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, isChangePass: false };

		case SOCIAL_LOGIN_REQUEST:
			return { ...state, isWaiting: true };

		case SOCIAL_LOGIN_SUCCESS:
			AsyncStorage.setItem('@access_token', action.data.data.autologin_token);
			return {
				...state,
				id: action.data.data.id,
				accessToken: action.data.data.autologin_token,
				isWaiting: false,
				userData: action.data.data
			};

		case SOCIAL_LOGIN_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false };

		case RESET_USER_TOKEN:
			return {
				...state,
				accessToken: null
			};

		case UPDATE_USER_PROFILE:
			return {
				...state,
				userData: action.payload
			}

		case GET_RECIPE_SUG_REQUEST:
			return { ...state, isWaiting: true, suggestionArr: null };

		case GET_RECIPE_SUG_SUCCESS:
			return {
				...state,
				suggestionArr: action.data.data,
				eMessage: '',
				isWaiting: false
			};

		case GET_RECIPE_SUG_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, suggestionArr: null };

		case CONTACT_REQUEST:
			return { ...state, isWaiting: true, contactSuccess: false };

		case CONTACT_SUCCESS:
			return {
				...state,
				eMessage: '',
				contactSuccess: true,
				isWaiting: false
			};

		case CONTACT_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false };

		case LIKE_DISLIKE_REC_REQUEST:
			return { ...state, isRecipeStatusUpdate: false };

		case LIKE_DISLIKE_REC_SUCCESS:
			return {
				...state,
				eMessage: '',
				isRecipeStatusUpdate: true
			};

		case LIKE_DISLIKE_REC_FAILURE:
			return { ...state, eMessage: action.error.message, isRecipeStatusUpdate: false };

		case DEL_MENU_REQUEST:
			return { ...state, isWaiting: true, deleteMealStatus: false };

		case DEL_MENU_SUCCESS:
			return {
				...state,
				eMessage: '',
				isWaiting: false,
				deleteMealStatus: true
			};

		case DEL_MENU_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, deleteMealStatus: false };

		case SEARCH_IND_REQUEST:
			return { ...state, isWaiting: true };

		case SEARCH_IND_SUCCESS:
			return {
				...state,
				eMessage: '',
				isWaiting: false,
				searchIndArr: action.data.data
			};

		case SEARCH_IND_FAILURE:
			return { 
				...state, 
				eMessage: action.error.message, 
				isWaiting: false 
			};

		case EDIT_GUEST_REQUEST:
			return { ...state, isWaiting: true, editGuestStatus: false };

		case EDIT_GUEST_SUCCESS:
			return {
				...state,
				eMessage: '',
				isWaiting: false,
				editGuestStatus: true
			};

		case EDIT_GUEST_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, editGuestStatus: false };

		case ADD_TO_MENU_REQUEST:
			return { ...state, isWaiting: true, addMenuStatus: false };

		case ADD_TO_MENU_SUCCESS:
			return {
				...state,
				eMessage: '',
				isWaiting: false,
				addMenuStatus: true
			};

		case ADD_TO_MENU_FAILURE:
			return { ...state, eMessage: action.error.message, isWaiting: false, addMenuStatus: false };

		default:
			return state;
	}
};

export default authReducer;
