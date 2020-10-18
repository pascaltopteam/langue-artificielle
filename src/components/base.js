// Base View

import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';

import constants from '../const';

class BaseView extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <View style={styles.container}>
        { children }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: constants.colors.bg
  }
});

BaseView.propTypes = {
  children: PropTypes.node
}

BaseView.defaultProps = {
  children: null
}

export default BaseView;