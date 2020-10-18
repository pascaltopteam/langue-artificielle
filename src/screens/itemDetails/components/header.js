// Header

import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { IconBack, IconHeartPopIcon, IconHeart } from '../../../assets/svg';
import styles from './styles';
import constants from '../../../const';

class Header extends React.Component {

  onPressHeart = () => {
    this.props.onPressHeart();
  }

  render() {
    const { navigation, isBooked } = this.props;

    return (
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View style={[constants.styles.row, {alignItems: 'center'}]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.pop()}
            >
              <IconBack width={43} height={43} />
            </TouchableOpacity>
            <View style={constants.styles.wrapper} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.onPressHeart()}
            >
              {
                isBooked ?
                  <IconHeartPopIcon width={43} height={43} />
                  :
                  <IconHeart width={33} height={33} />
              }
            </TouchableOpacity>
          </View>
          <View style={constants.styles.row}>

          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Header;