// Cell for Filter screen

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { AvoText } from '../../../components';
import { IconCheck, IconBroccoli, IconBroccoliGrey } from '../../../assets/svg';

import constants from '../../../const';

class Cell extends React.Component {
  render() {
    const { title, isChecked } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, isChecked && {backgroundColor: constants.colors.select}]}
        {...this.props}
      >
        {
          isChecked ? <IconBroccoli width={17} height={21} /> : <IconBroccoliGrey width={17} height={21} />
        }
        {
          isChecked ? <AvoText text={title} fontWeight='bold' /> : <AvoText text={title} /> 
        }
        {
          isChecked && <IconCheck width={20} height={20} />
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: constants.screen.width - 20,
    marginLeft: 10
  },
  title: {
    fontSize: 14,
    marginLeft: 10
  },
});

Cell.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onChangeValue: PropTypes.func
};

Cell.defaultProps = {
  title: '',
  data: []
};

export default Cell;