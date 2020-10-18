// Intro Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Intro from '../screens/intro';

const IntroNavigator = createStackNavigator(
  {
    Intro: {
      screen: Intro
    }
  }, {
    initialRouteName: 'Intro',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

export default IntroNavigator;