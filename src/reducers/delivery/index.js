// Delivery reducer

import {
  GET_STORES_SUCCESS,
  GET_STORES_REQUEST,
  GET_STORES_FAILURE,
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAILURE,
  SEARCH_ADDRESS_REQUEST,
  SEARCH_ADDRESS_SUCCESS,
  SEARCH_ADDRESS_FAILURE
} from '../../actions/types';

const initialState = {
  isLoading: false,
  stores: [],
  cart: null,
  collection: null,
  error: null
}

const deliveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STORES_REQUEST:
      return {
        isLoading: true,
        error: null
      };
    case GET_STORES_SUCCESS:
      return {
        isLoading: false,
        stores: action.data.data,
        error: null
      }
    case GET_STORES_FAILURE:
      return {
        isLoading: false,
        error: action.error
      }
    case CREATE_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case CREATE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.data.data,
        error: null
      }
    case CREATE_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        cart: null,
        error: action.error
      }
    case SEARCH_ADDRESS_REQUEST:
      return {
        ...state,
        error: null
      };
    case SEARCH_ADDRESS_SUCCESS:
      return {
        ...state,
        collection: action.data.data,
        error: null
      }
    case SEARCH_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}

export default deliveryReducer;