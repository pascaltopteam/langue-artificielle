// Search bar

import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { AvoSearch } from '../../../components';
import { IconSetting } from '../../../assets/svg';

import styles from './styles';
import constants from '../../../const';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
  }

  onFocus = () => {
    this.props.onFocusSearch();
  }

  onChangeText = text => {
    this.props.onChangeSearchText(text);
  }

  onSetting = () => {
    this.props.onSetting();
  }

  render() {
    const { isWaitingSearchResult, onEndEditing } = this.props;

    return (
      <View style={styles.searchBox}>
        <View style={constants.styles.wrapper}>
          <AvoSearch
            autoFocus={false}
            isWaiting={isWaitingSearchResult}
            placeholder="Rechercher dans mon livre de recettes"
            returnKeyType='search'
            onFocus={() => this.onFocus()}
            onChangeText={(text) => { this.onChangeText(text) }}
            onEndEditing={onEndEditing}
          />
        </View>
        <TouchableOpacity
          style={styles.settingBtn}
          onPress={() => this.onSetting()}
        >
          <IconSetting />
        </TouchableOpacity>
      </View>
    );
  }

}

export default SearchBar;