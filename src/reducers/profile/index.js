// Profile reducer

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
} from '../../actions/types';

const initialState = {
  isLoading: false,
  isFamilyUpdate: false,
  searchResult: [],
  family: null,
  isProfileUpdate: false,
  profileData: null,
  error: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_FAMILY_REQUEST:
    return {
      ...state,
      isLoading: true,
    };

  case GET_FAMILY_SUCCESS:
    return {
      ...state,
      error: null,
      family: action.data.data,
      isLoading: false,
    };

  case GET_FAMILY_FAILURE:
    return {
      ...state,
      error: action.error.response.data,
      isLoading: false
    };

  case SET_FAMILY_REQUEST:
    return { 
      ...state, 
      isLoading: true, 
      isFamilyUpdate: false 
    };

  case SET_FAMILY_SUCCESS:
    return {
      ...state,
      error: null,
      isLoading: false,
      family: action.data.data,
      isFamilyUpdate: true
    };

  case SET_FAMILY_FAILURE:
    return { 
      ...state, 
      error: action, 
      isLoading: false, 
      isFamilyUpdate: false
    };

  case UPDATE_PROFILE_REQUEST:
    return { 
      ...state, 
      isLoading: true, 
      isProfileUpdate: false,
      profileData: null
    };

  case UPDATE_PROFILE_SUCCESS:
    // access_token = state.userData ? state.userData.access_token : null;
    // arrData = action.data.data;
    // arrData.access_token = access_token;
    return {
      ...state,
      error: null,
      isProfileUpdate: true,
      profileData: action.data.data,
      isLoading: false
    };

  case UPDATE_PROFILE_FAILURE:
    return { 
      ...state, 
      error: action, 
      isLoading: false,
      isProfileUpdate: false
    };

  default:
    return state;
  }
}

export default profileReducer;