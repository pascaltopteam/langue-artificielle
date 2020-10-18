// Search Box component

import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard } from 'react-native';
import { AvoText } from '../../../components';
import { IconSearchWhite } from '../../../assets/svg';
import constants from '../../../const';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isSearch: false
    }
  }

  onAddress = (address, index) => {
    Keyboard.dismiss();
    this.setState({
      value: address,
      isSearch: false
    }, () => {
      this.props.onAddress(index);
    });
  }

  onChangeText = text => {
    this.setState({
      value: text,
      isSearch: true
    }, () => {
      this.props.onChangeText(text);
    });
  }

  renderAddress = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => this.onAddress(item, index)}
      >
        <AvoText text={item} />
      </TouchableOpacity>
    )
  }

  render() {
    const { onSearch, address } = this.props;
    const { value, isSearch } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.search}>
            <TextInput
              style={styles.searchText}
              value={value}
              placeholder="Adresse de livraison, code postal, ..."
              placeholderTextColor={constants.colors.placeholder}
              onChangeText={text => this.onChangeText(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onSearch}
          >
            <IconSearchWhite width={15} height={15} />
          </TouchableOpacity>
        </View>
        {
          address.length > 0 && isSearch == true &&
          <FlatList
            style={styles.address}
            data={address}
            renderItem={this.renderAddress}
            keyboardShouldPersistTaps='handled'
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1
  },
  wrapper: {
    width: constants.screen.width - 40,
    height: 46,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderColor: constants.colors.border,
    backgroundColor: 'white'
  },
  searchText: {
    flex: 1,
    fontFamily: 'Gotham-Book',
    fontSize: 15,
  },
  button: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.tint,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'transparent',
    shadowColor: constants.colors.tint,
    shadowOpacity: 0.5,
    shadowOffset: {
      x: 0,
      y: 5
    },
    shadowRadius: 5
  },
  address: {
    width: '100%',
    height: constants.screen.height * 0.3,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    elevation: 3
  },
  item: {
    width: '100%',
    height: 40,
    justifyContent: 'center'
  }
});

export default SearchBox;