// Favorite reducer

import {
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAILURE,
  UPDATE_FAVORITE_REQUEST,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_FAILURE,
  SEARCH_FEV_REC_FAILURE,
	SEARCH_FEV_REC_REQUEST,
  SEARCH_FEV_REC_SUCCESS,
  DELETE_FAVORITE_SUCCESS, 
  DELETE_FAVORITE_FAILURE, 
  DELETE_FAVORITE_REQUEST
} from '../../actions/types';

const initialState = {
  isLoading: false,
  favoritesObject: null,
  isAdded: false,
  isDeleted: false,
  searchFavRecipeResult: [],
  error: null,
  getFavoriteError: null
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FAVORITE_SUCCESS:
      return {
        ...state,
        getFavoriteError: null,
        isLoading: false,
        favoritesObject: action.data.data
      };

    case FAVORITE_FAILURE:
      return {
        ...state,
        getFavoriteError: action.error,
        isLoading: false
      };

    case UPDATE_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAdded: false
      };

    case UPDATE_FAVORITE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAdded: true
      };

    case UPDATE_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isAdded: false
      };

    case SEARCH_FEV_REC_REQUEST:
      return { 
        ...state,
        error: action.error,
      };

    case SEARCH_FEV_REC_SUCCESS:
      return {
        ...state,
        error: action.error.response.data,
        searchFavRecipeResult: action.data.data
      };

    case SEARCH_FEV_REC_FAILURE:
      return { 
        ...state, 
        error: action.error.response.data,
      };

    case DELETE_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
      }

    case DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isDeleted: true,
      }

    case DELETE_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isDeleted: false,
      }

    default:
      return state;
  }
}

export default favoriteReducer;