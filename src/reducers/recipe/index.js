// Recipe reducer

import {
  GET_RECIPE_BY_ID_REQUEST,
  GET_RECIPE_BY_ID_SUCCESS,
  GET_RECIPE_BY_ID_FAILURE
} from '../../actions/types';

const initialState = {
  isLoading: false,
  recipeObject: null,
  errorMessage: ''
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_RECIPE_BY_ID_REQUEST:
    return { 
      ...state, 
      isLoading: true, 
      recipeObject: null 
    };

  case GET_RECIPE_BY_ID_SUCCESS:
    return {
      ...state,
      recipeObject: action.data.data,
      errorMessage: '',
      isLoading: false
    };

  case GET_RECIPE_BY_ID_FAILURE:
    return { 
      ...state, 
      errorMessage: action.error.message, 
      isLoading: false, 
      recipeObject: null 
    };
  
  default:
    return state;
  }
}

export default recipeReducer;