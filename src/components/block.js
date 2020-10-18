// Block

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import AvoText from './avoText';
import constants from '../const';

class Block extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <View style={styles.container}>
        <AvoText
          text={title}
          fontWeight={'bold'}
          style={styles.title}
        />
        { children }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: constants.sizes.TXT_SIZE,
    marginBottom: 16,
    color:'black'
  }
});

Block.propTypes = {
  title: PropTypes.string,
};

Block.defaultProps = {
  title: ''
};

export default Block;