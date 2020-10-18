// Styles for components

import { StyleSheet } from 'react-native';
import constants from '../../../const';

const styles = StyleSheet.create({
  circleTextContainer: {
    width: 23,
    height: 23,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.lightGreenBg
  },
  circleText: {
    color: constants.colors.tint,
    fontSize: 14,
    marginBottom: Platform.OS == "ios" ? -4 : 0
  }
});

export default styles;