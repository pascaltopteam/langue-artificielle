// Switch for payment mode

import React from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { AvoText } from '../../../components';
import constants from '../../../const';

class Switch extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      index: 0
    };
    this.indicateX = new Animated.Value(1);
  }

  onTap = index => {
    this.setState({ index });
    this.props.onSwitch(index);
    Animated.spring(this.indicateX, {
      toValue: index == 0 ? 1 : (constants.screen.width - 40) / 2 - 1
    }).start();
  }

  render() {
    const { index } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.indicator, {left: this.indicateX}]} />
        <TouchableOpacity
          style={constants.styles.wrapperHVCenter}
          activeOpacity={1}
          onPress={() => this.onTap(0)}
        >
          <AvoText 
            style={[styles.text, {color: index == 0 ? 'white' : constants.colors.placeholder}]}
            fontWeight='light'
            text="Livraison"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={constants.styles.wrapperHVCenter}
          activeOpacity={1}
          onPress={() => this.onTap(1)}
        >
          <AvoText 
            style={[styles.text, {color: index == 1 ? 'white' : constants.colors.placeholder}]} 
            fontWeight='light'
            text="Drive"
          />
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: constants.screen.width - 40,
    height: 46,
    borderRadius: 5,
    borderColor: constants.colors.tint,
    borderWidth: 1,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
  },
  indicator: {
    position: 'absolute',
    top: 1,
    width: (constants.screen.width - 44) / 2,
    height: 42,
    borderRadius: 4,
    backgroundColor: constants.colors.tint
  }
});

export default Switch;