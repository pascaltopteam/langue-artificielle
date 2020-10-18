// App Navigator

import { createStackNavigator } from 'react-navigation-stack';

import AppInitial from '../screens';
import IntroNavigator from './introNavigator';
import AuthNavigator from './authNavigator';
import TabNavigator from './tabNavigator';
import ProfileNavigator from './profileNavigator';
import Welcome from '../screens/welcome';

const AppNavigator = createStackNavigator(
	{
		Initial: {
			screen: AppInitial
		},
		Intro: {
			screen: IntroNavigator
		},
		Welcome: {
			screen: Welcome
		},
		Auth: {
			screen: AuthNavigator
		},
		Main: {
			screen: TabNavigator
		},
		ProfileStack: {
			screen: ProfileNavigator
		}
	},
	{
		initialRouteName: 'Initial',
		defaultNavigationOptions: {
			headerShown: false,
			gestureEnabled: false
		}
	}
);

export default AppNavigator;
