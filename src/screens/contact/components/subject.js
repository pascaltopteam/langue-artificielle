// Subject component

import React from 'react';
import { View, TextInput, StyleSheet,Platform } from 'react-native';

import { IconSearch } from '../../../assets/svg';

import constants from '../../../const';

class Subject extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <IconSearch width={constants.screen.width*0.06} height={constants.screen.width*0.06} />
         <TextInput
          {...this.props}
          style={styles.input}
          placeholder='Sujet'
          placeholderTextColor='black'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: constants.colors.search,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical:Platform.OS=='android'?0: 15,
  },
  input: {
    flex: 1,
    fontFamily: 'Gotham-Book',
    fontSize:constants.sizes.INPUT_TXT_SIZE,
    paddingHorizontal: 16
  }
});

export default Subject;