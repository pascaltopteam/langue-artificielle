// Header component

import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';

import { AvoText } from '../../../components';

import constants from '../../../const';

class Header extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }
  }

  onTapInspiration = () => {
    this.setState({ index: 0 });
    this.props.onTapInspiration();
  }

  onTapFavorite = () => {
    this.setState({ index: 1 });
    this.props.onTapFavorite();
  }

  render() {
    const { index } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar barStyle='dark-content' />
          <View style={styles.tabContainer}>
            <View style={constants.styles.wrapperCenter}>
              <TouchableOpacity 
                style={[styles.button, index == 0 && styles.buttonBorder]}
                onPress={() => this.onTapInspiration()}
              >
                <AvoText
                  style={styles.buttonTitle}
                  fontWeight='bold'
                >
                  Inspiration
                </AvoText>
              </TouchableOpacity>
            </View>
            <View style={constants.styles.wrapperCenter}>
              <TouchableOpacity 
                style={[styles.button, index == 1 && styles.buttonBorder]}
                onPress={() => this.onTapFavorite()}
              >
                <AvoText
                  style={styles.buttonTitle}
                  fontWeight='bold'
                >
                  Favoris
                </AvoText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white'
  },
  title: {
    fontSize: constants.sizes.TITLE_SIZE,
    marginHorizontal: 5,
    color: constants.colors.tint,
    textAlign: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20
  },
  button: {
    paddingVertical: 10
  },
  buttonTitle: {
    color: constants.colors.tint,
    fontSize: constants.sizes.BTN_TXT_SIZE
  },
  buttonBorder: {
    borderBottomColor: constants.colors.tint,
    borderBottomWidth: 2,
  }
});

export default Header;