// Reducer

import { combineReducers } from 'redux';

import authReducer from './authReducer';
import inspirationReducer from './inspiration';
import profileReducer from './profile';
import favoriteReducer from './favorite';
import menuReducer from './menu';
import recipeReducer from './recipe';
import deliveryReducer from './delivery';

const appReducer = combineReducers({
  auth: authReducer,
  inspiration: inspirationReducer,
  profile: profileReducer,
  favorite: favoriteReducer,
  menu: menuReducer,
  recipe: recipeReducer,
  delivery: deliveryReducer
});

const reducer = (state, action) => {
  return appReducer(state, action);
}

export default reducer;
