// Inspiration reducer

import {
  SEARCH_SUG_REC_FAILURE,
  SEARCH_SUG_REC_REQUEST,
  SEARCH_SUG_REC_SUCCESS,
  GET_INSPIRATION_REQUEST,
  GET_INSPIRATION_SUCCESS,
  GET_INSPIRATION_FAILURE
} from '../../actions/types';

const initialState = {
  isLoading: false,
  isLoadingInspiration: false,
  searchResult: [],
  inspirationsObject: null,
  errorMessage: ''
};

const inspirationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUG_REC_REQUEST:
      return { ...state, isLoading: true }

    case SEARCH_SUG_REC_SUCCESS:
      return { ...state, isLoading: false, searchResult: action.data.data }

    case SEARCH_SUG_REC_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.error.message }

    case GET_INSPIRATION_REQUEST:
      return { ...state, isLoadingInspiration: true }

    case GET_INSPIRATION_SUCCESS:
      return { 
        ...state, 
        isLoadingInspiration: false, 
        inspirationsObject: action.data.data 
      }

    case GET_INSPIRATION_FAILURE:
      return { 
        ...state, 
        isLoadingInspiration: false, 
        errorMessage: action.error.message 
      }

    default:
      return state;
  }
}

export default inspirationReducer;
