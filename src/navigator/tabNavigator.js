// Tab Navigator

import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeStackNavigator from './homeStackNavigator';
import MenuStackNavigator from './menuStackNavigator';
import RecipeStackNavigator from './recipeStackNavigator';
import ProfileStackNavigator from './profileNavigator';

import {
	IconUtensilActive,
	IconUtensil,
	IconBroccoli,
	IconBroccoliGrey,
	IconFoodActive,
	IconFood, 
	IconPerson
} from '../assets/svg';

import constants from '../const';

const TabNavigator = createBottomTabNavigator(
	{
		Menu: {
			screen: HomeStackNavigator,
			navigationOptions: {
				title: "Mes menus",
				tabBarIcon: ({ focused }) =>
					focused ? <IconFoodActive width={25} height={17} /> : <IconFood width={25} height={17} />
			}
		},
		Recipes: {
			screen: RecipeStackNavigator,
			navigationOptions: {
				title: "Mes recettes",
				tabBarIcon: ({ focused }) =>
					focused ? <IconBroccoli width={16} height={20} /> : <IconBroccoliGrey width={16} height={20} />
			}
		},
		Cook: {
			screen: MenuStackNavigator,
			navigationOptions: {
				title: "Je cuisine",
				tabBarIcon: ({ focused }) =>
					focused ? <IconUtensilActive width={18} height={20} /> : <IconUtensil width={18} height={20} />
			}
		},
		Profile: {
			screen: ProfileStackNavigator,
			navigationOptions: {
				title: "Profil",
				tabBarIcon: ({ focused }) =>
					focused ? <IconPerson width={25} height={25} /> : <IconPerson width={25} height={25} />
			}
		},
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({}),
		swipeEnabled: false,
		animationEnabled: false	,
		tabBarOptions: {
			activeTintColor: constants.colors.tint,
			inactiveTintColor: constants.colors.grey,
			style: {
				borderTopColor: 'transparent',
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
				paddingVertical: 5,
				paddingTop: 10
			}
		}
	}
);

export default TabNavigator;
