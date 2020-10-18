// Home Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/home';
import Delivery from '../screens/delivery';
import Charging from '../screens/charging';
import Menu from '../screens/menu';
import Course from '../screens/course';
import AddRecipe from '../screens/menu/addRecipe';
import ItemDetails from '../screens/itemDetails'
import { FilterCategory, FilterPerson, FilterRecipe } from '../screens/filter';
import SelectMenu from '../screens/home/selectMenu';
import constants from '../const';

const HomeStackNavigator = createStackNavigator(
	{
		Home: {
			screen: Home
		},
		SelectMenu: { 
			screen: SelectMenu 
		},
		FilterCategory: {
			screen: FilterCategory
		},
		FilterPerson: {
			screen: FilterPerson
		},
		FilterRecipe: {
			screen: FilterRecipe
		},
		ChargingHome: {
			screen: Charging
		},
		MenuHome: {
			screen: Menu
		},
		Delivery: {
			screen: Delivery
		},
		Course,
		AddRecipeHome: {
			screen: AddRecipe
		},
		RecipeDetails: {
      screen: ItemDetails
    },
	},
	{
		initialRouteName: constants.isHome ? 'Home' : 'SelectMenu',
		defaultNavigationOptions: {
			headerShown: false
		}
	}
);

HomeStackNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
	  tabBarVisible = false;
	}
	return { tabBarVisible };
};

export default HomeStackNavigator;
