// InspirationScroll Component

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { InspirationHBar } from '../../../components/inspiration';

import constants from '../../../const';

class InspirationScroll extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  renderItem = ({ item, index }) => {
    const { navigation, onSwipeLeft, onSwipeRight } = this.props;

    return (
      <InspirationHBar
        key={index}
        navigation={navigation}
        item={item}
        onScrollLeftEnd={() => onSwipeLeft(item, index)}
        onScrollRightEnd={() => onSwipeRight(item, index)}
      />
    )
  }

  render() {
    const { data } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={data}
        renderItem={this.renderItem}
      />
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