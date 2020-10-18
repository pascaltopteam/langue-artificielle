// App Initial Screen

import React from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import BaseComponent from './base';
import { autoLoginRequest } from '../actions';
import constants from '../const';

class AppInitial extends BaseComponent {

	componentDidMount() {
		this.checkAppStatus();
	}

	componentDidUpdate(prevProps) {
		const { isLoginWaiting, accessToken, id, error, userData, navigation } = this.props;

		if (prevProps.id != id) {
			console.log('id');
		}

		if (prevProps.isLoginWaiting != isLoginWaiting) {
			console.log('isLoginWaiting');
		}

		if (prevProps.navigation != navigation) {
			// console.log('navigation');
		}

		if (prevProps.userData != userData) {
			console.log('userData');
		}

		if (error != '') {
			navigation.navigate('Auth');
		} else {
			if (prevProps.accessToken != accessToken) {
				if (this.isValueAvailable(accessToken)) {
					navigation.navigate('Main');
				} else {
					navigation.navigate('Auth');
				}
			}
		}
	}

	autoLoginCheck = token => {
		const { autoLoginRequest } = this.props;
		const params = { token };
		autoLoginRequest(params);
	};

	checkAppStatus = async () => {
		const { navigation } = this.props;

		try {
			const first_launch = await AsyncStorage.getItem('@first_launch');
			const access_token = await AsyncStorage.getItem('@access_token');
			if (first_launch != null) {
				if (access_token) {
					this.autoLoginCheck(access_token);
				} else {
					navigation.navigate('Auth');
				}
			} else {
				navigation.navigate('Intro');
			}
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Image
					source={require('../assets/svg/bgPng.png')}
					style={{ width: constants.screen.width, height: constants.screen.height }}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isLoginWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData
	};
};

const mapDispatchToProps = {
	autoLoginRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInitial);
