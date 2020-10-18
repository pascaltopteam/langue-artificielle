// Home Navigation

import { createStackNavigator } from 'react-navigation-stack';
import Inspiration from '../screens/inspiration';
import ItemDetails from '../screens/inspiration/itemDetails';
import RecipeType from '../screens/inspiration/recipeType';

const InspirationStackNavigator = createStackNavigator(
  {
    Inspiration: {
      screen: Inspiration
    },
    ItemDetails: {
      screen: ItemDetails
    },
    RecipeType: {
      screen: RecipeType
    },
  }, {
    initialRouteName: 'Inspiration',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
)

InspirationStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
}

export default InspirationStackNavigator;