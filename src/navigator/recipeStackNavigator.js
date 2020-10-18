// Home Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Recipe from '../screens/recipe';
import ItemDetails from '../screens/itemDetails';
import RecipeType from '../screens/inspiration/recipeType';

const RecipeStackNavigator = createStackNavigator(
  {
    Recipe: {
      screen: Recipe
    },
    ItemDetails: {
      screen: ItemDetails
    },
    RecipeType: {
      screen: RecipeType
    }
  }, {
    initialRouteName: 'Recipe',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

RecipeStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
}

export default RecipeStackNavigator;