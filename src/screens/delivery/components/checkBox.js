// Checkbox for saving address

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IconRectCheck, IconRect } from '../../../assets/svg';
import { AvoText } from '../../../components';

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    }
  }

  onPress = () => {
    const { isChecked } = this.state;

    this.props.onCheck(!isChecked);
    this.setState({ isChecked: !isChecked });
  }

  render() {
    const { isChecked } = this.state;

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}  
        onPress={() => this.onPress()}
      >
        {
          isChecked ?
            <IconRectCheck width={20} height={20} />
            :
            <IconRect width={20} height={20} />
        }
        <AvoText 
          style={styles.text}
          fontWeight='light'
          text='Enregister cette adresse'
        />
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  text: {
    fontSize: 14,
    paddingLeft: 8
  }
});

export default CheckBox;