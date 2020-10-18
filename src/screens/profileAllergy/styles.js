// Styles

import { StyleSheet } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  button: {
    width: '100%',
    marginBottom: constants.isIphoneX ? 20 : 0
  }
});

export default styles;