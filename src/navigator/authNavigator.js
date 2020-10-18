// Auth Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/login';
import Welcome from '../screens/welcome';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    }
    
  }, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

export default AuthNavigator;