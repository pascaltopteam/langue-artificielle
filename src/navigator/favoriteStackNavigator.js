// Home Navigation

import { createStackNavigator } from 'react-navigation-stack';
import ItemDetails from '../screens/inspiration/itemDetails';
import Favorite from '../screens/favorite';

const FavoriteStackNavigator = createStackNavigator(
  {
    Favorite:{
        screen:Favorite
    },
    ItemDetails: {
      screen: ItemDetails
    }
  }, {
    initialRouteName: 'Favorite',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
)

FavoriteStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
}

export default FavoriteStackNavigator;