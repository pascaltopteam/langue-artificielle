// Menu Navigation

import { createStackNavigator } from 'react-navigation-stack';
import ItemDetails from '../screens/itemDetails';
import Menu from '../screens/menu';
import AddRecipe from '../screens/menu/addRecipe'

const MenuStackNavigator = createStackNavigator(
  {
    Menu,
    ItemDetails,
    AddRecipe
  }, {
    initialRouteName: 'Menu',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
)

MenuStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
}

export default MenuStackNavigator;