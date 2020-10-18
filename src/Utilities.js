import { Dimensions, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//./storage.js
const Storage = {
	getItem: async function(key) {
		let item = await AsyncStorage.getItem(key);
		//You'd want to error check for failed JSON parsing...
		return JSON.parse(item);
	},
	setItem: async function(key, value) {
		return await AsyncStorage.setItem(key, JSON.stringify(value));
	},
	removeItem: async function(key) {
		return await AsyncStorage.removeItem(key);
	}
};

const isIphoneX = () => {
	const dimen = Dimensions.get('window');

	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
	);
};
const passwordValidation = (password) => {
	var passwordString = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

	return password.match(passwordString);
};

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const ifIphoneX = (iphoneXStyle, regularStyle) => {
	if (isIphoneX()) {
		return iphoneXStyle;
	}
	return regularStyle;
};

const getStatusBarHeight = (safe) => {
	return Platform.select({
		ios: ifIphoneX(safe ? 44 : 30, 20),
		android: StatusBar.currentHeight
	});
};
const emailValidation = (email) => {
	var emailString = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.+[A-Za-z]{2,64}';
	return email.match(emailString) ? true : false;
};
const multisort = (arr, columns, order_by) => {
	if (typeof columns == 'undefined') {
		columns = [];
		for (x = 0; x < arr[0].length; x++) {
			columns.push(x);
		}
	}

	if (typeof order_by == 'undefined') {
		order_by = [];
		for (x = 0; x < arr[0].length; x++) {
			order_by.push('ASC');
		}
	}

	function multisort_recursive(a, b, columns, order_by, index) {
		var direction = order_by[index] == 'DESC' ? 1 : 0;

		var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);

		var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
		var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();

		if (x < y) {
			return direction == 0 ? -1 : 1;
		}

		if (x == y) {
			return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
		}

		return direction == 0 ? 1 : -1;
	}

	return arr.sort(function(a, b) {
		return multisort_recursive(a, b, columns, order_by, 0);
	});
};

const utilities = {
	Storage,
	isIphoneX,
	isNumber,
	getStatusBarHeight,
	emailValidation,
	multisort,
	passwordValidation
};

module.exports = utilities;
