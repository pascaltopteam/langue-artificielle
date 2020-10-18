// InspirationScroll Component

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { InspirationHBar } from '../../../components/inspiration';

import constants from '../../../const';

class InspirationScroll extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  render() {
    const { data, navigation, isSearching, onSwipeLeft, onSwipeRight } = this.props;

    return (
      <ScrollView style={styles.container}>
        {
          data.map((value, index) =>
            <InspirationHBar
              key={index}
              navigation={navigation}
              item={value}
              onScrollLeftEnd={() => onSwipeLeft(value, index)}
              onScrollRightEnd={() => onSwipeRight(value, index)}
            />
          )
        }
        { isSearching && <View style={styles.cover} /> }
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  cover: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: constants.colors.modal
  }
});

export default InspirationScroll;