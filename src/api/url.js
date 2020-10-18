// API endpoints

import Env from './env';

const makeURL = (url, version = Env.version) => {
	return `${Env.baseURL}/v${version}/${url}?apikey=${Env.apiKey}`;
};

const makeFlyMenuURL = (url) => {
	return `https://api-preprod.flymenu.fr/${url}`
}

const url = {
	login: makeURL('user/login'),
	register: makeURL('user/signup'),
	socialLogin: makeURL('user/sociallogin'),
	autoLogin: makeURL('user/autologin'),
	passReset: makeURL('user/updatelostpassword'),
	passCode: makeURL('user/sendlostpasswordcode'),
	getRecipeSug: makeURL('recipe/suggestions'),
	getRecipeById: makeURL('recipe/get'),
	getInspiration: makeURL('recipe/suggestions'),
	updateProfile: makeURL('user/profile'),
	contact: makeURL('user/contact', '1'),
	favorite: makeURL('recipe/bookmark/get'),
	favoriteUpdate: makeURL('recipe/bookmark/add'),
	deleteFavorite: makeURL('recipe/bookmark/delete'),
	getMenu: makeURL('mealplan/get'),
	delMenu: makeURL('mealplan/remove'),
	editGuest: makeURL('mealplan/editguest'),
	generateMenu: makeURL('mealplan/generate'),
	getFamily: makeURL('user/familymemberget'),
	setFamily: makeURL('user/familymemberset'),
	searchInd: makeURL('ingredient/search', '1'),
	searchFevRec: makeURL('recipe/bookmarksearch'),
	searchSugRec: makeURL('recipe/search'),
	likeRec: makeURL('recipe/like'),
	dislikeRec: makeURL('recipe/dislike'),
	replaceMenu: makeURL('mealplan/replace'),
	addToMenu: makeURL('mealplan/add'),
	getMenuInd: makeURL('mealplan/ingredients'),
	loginFlyMenu: makeURL('user/login'),
	getStores: makeFlyMenuURL('drive/index.php'),
	createCart: makeFlyMenuURL('cart/build.php'),
	searchAddress: 'https://api-adresse.data.gouv.fr/search/?q=',

	basic_auth: 'Basic YXZvY2Fkb29GenFVNVY6dGh6MjNDcDZrRVd4dkM0STJmNG41eFhMdUMwdUZE',
	basic_auth_username: 'avocadooFzqU5V',
	basic_auth_password: 'thz23Cp6kEWxvC4I2f4n5xXLuC0uFD'
};

export default url;
