// Dots

import React from 'react';
import { View, StyleSheet } from 'react-native';

import constants from '../../const';

const Dots = ({ index = 0 }) => {
  return (
    <View style={styles.container}>
    { index == 0 ? <ActiveDot /> : <Dot /> }
    { index == 1 ? <ActiveDot /> : <Dot /> }
    { index == 2 ? <ActiveDot /> : <Dot /> }
    </View>
  );
}

const Dot = () => {
  return (
    <View style={styles.circle} />
  );
}

const ActiveDot = () => {
  return (
    <View style={styles.bigCircle} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: constants.colors.tint50
  },
  bigCircle: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: constants.colors.tint,
    shadowColor: constants.colors.tint,
    shadowOffset: {
      x: 0,
      y: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
  }
});

export default Dots;