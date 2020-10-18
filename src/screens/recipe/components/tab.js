// Tab

import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';

import { AvoText } from '../../../components';

import styles from './styles';
import constants from '../../../const';

class Tap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
    this.moveX = new Animated.Value(1);
  }

  /* This method is called when user taps 'Inspiration' or 'Favorit'
  ** Parameter: index (index of tab)
  */
  onTap = index => {
    this.setState({ index });
    this.props.onTap(index);

    Animated.spring(this.moveX, {
      toValue: index == 0 ? 1 : constants.screen.width * 0.3 - 12
    }).start();
  }

  render() {
    const { index } = this.state;

    return (
      <View style={styles.tab}>
        <Animated.View 
          style={[styles.tabIndicator, { 
              position: 'absolute',
              top: 1,
              left: this.moveX
            }
          ]} 
        />
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => this.onTap(0)}
        >
          <AvoText
            style={{ color: index == 0 ? 'white' : constants.colors.tint }}
            fontWeight='bold'
          >
            Inspiration
          </AvoText>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => this.onTap(1)}
        >
          <AvoText
            style={{ color: index == 1 ? 'white' : constants.colors.tint }}
            fontWeight='bold'
          >
            Favoris
          </AvoText>
        </TouchableOpacity>
      </View>
    );
  }

}

export default Tap;