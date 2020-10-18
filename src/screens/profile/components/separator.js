// Separator

import React from 'react';
import { View } from 'react-native';

import constants from '../../../const';

const Separator = () => {
  return (
    <View 
      style={{
        width: constants.screen.width *0.9,
        alignSelf:'center',
        height: 1,
        backgroundColor: constants.colors.separator,
        marginBottom: 20
      }} 
    />
  )
}

export default Separator;