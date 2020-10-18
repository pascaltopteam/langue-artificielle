// Base View for Filter screen

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import BaseView from '../base';
import { AvoText, AvoButton } from '../';
import { IconClose } from '../../assets/svg';

import constants from '../../const';

class BaseFilterView extends React.Component {
  render() {
    const { title, subTitle, navigation, children } = this.props;

    return (
      <BaseView>
        {
          subTitle == '' ?
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.close}
                onPress={() => {navigation.pop()}}
              >
                <IconClose width={12} height={12} />
              </TouchableOpacity>
              <View style={constants.styles.wrapperCenter}>
                <AvoText
                  style={styles.title}
                  fontWeight='bold'
                  text={title}
                />
              </View>
              <View style={styles.close} />
            </View>
            :
            <View style={styles.headerLarge}>
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.close}
                  onPress={() => {navigation.pop()}}
                >
                  <IconClose width={12} height={12} />
                </TouchableOpacity>
                <View style={constants.styles.wrapperCenter}>
                  <AvoText
                    style={styles.title}
                    fontWeight='bold'
                    text={title}
                  />
                </View>
                <View style={styles.close} />
              </View>
              <View style={{alignItems: 'center'}}>
                <AvoText
                  style={styles.subTitle}
                  text={subTitle}
                />
              </View>
            </View>
        }
        { children }
        <AvoButton
          style={styles.button}
          title='Annuler'
          onPress={() => {navigation.pop()}}
        />
      </BaseView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: constants.isIphoneX ? 97 : 73,
    backgroundColor: 'white',
    paddingTop: constants.isIphoneX ? 31 : 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerLarge: {
    width: '100%',
    height: constants.isIphoneX ? 144 : 120,
    backgroundColor: 'white'
  },
  close: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 14,
    color: constants.colors.placeholder,
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    width: constants.screen.width - 40,
    left: 20,
    bottom: constants.isIphoneX ? 40 : 10
  }
});

BaseFilterView.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  navigation: PropTypes.object,
  children: PropTypes.node
}

BaseFilterView.defaultProps = {
  title: '',
  subTitle: ''
}

export default BaseFilterView;