// Charging screen

import React from 'react';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native';
import BaseComponent from '../base';
import { AvoText } from '../../components';
import { ImageFruits, ImageShoppingCart } from '../../assets/svg';
import constants from '../../const';
import styles from './styles';

class Charging extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.fadeAnim = new Animated.Value(1)
  }

  componentDidMount() {

  }

  componentDidUpdate = (prevProps) => {
    const { isLoading } = this.props;

    if (prevProps.isLoading != isLoading && isLoading == false) {
      Animated.timing(this.fadeAnim, {
        toValue: 0,
        duration: 2000
      }).start(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <Animated.View style={{
            position: 'absolute', 
            width: constants.screen.width,
            height: constants.screen.height,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: this.fadeAnim,
            backgroundColor: 'rgb(255, 255, 204)'
          }}
        >
          <ImageFruits width={224} height={213} />
          <View style={{ height: 35 }} />
          <ImageShoppingCart width={132} height={116} />
          <AvoText
            style={styles.text}
            fontWeight='bold'
            text="Chargement..."
          />
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = state => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Charging);