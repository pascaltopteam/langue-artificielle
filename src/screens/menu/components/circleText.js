// Circle text

import React from 'react';
import { View } from 'react-native';
import { AvoText } from '../../../components';
import styles from './styles';

const CircleText = ({text = ""}) => {
  return (
    <View style={styles.circleTextContainer}>
      <AvoText
        style={styles.circleText}
        fontWeight='bold'
      >
        {text}
      </AvoText>
    </View>
  )
}

export default CircleText;