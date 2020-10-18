// Recipe screen

import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView, Keyboard } from 'react-native';

import BaseView from '../../components/base';
import { SearchBar, RecipeContent } from './components';

import { searchInspirationRequest } from '../../actions/inspiration';

import styles from './styles';

class Recipe extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
      isShownSetting: false,
      isWaitingSearchResult: false,
      searchResult: []
    }
  }

  componentDidUpdate(prevProps) {
    const { searchResult, isWaitingSearchResult } = this.props;

    if (searchResult != prevProps.searchResult) {
      this.setState({ searchResult });
    }
    if (isWaitingSearchResult != prevProps.isWaitingSearchResult) {
      this.setState({ isWaitingSearchResult });
    }
  }

  onFocusSearch = () => {
    this.setState({ isSearching: true });
  }

  onChangeSearchText = text => {
    const { searchInspirationRequest, userData } = this.props;
    const { access_token } = userData;
    const params = {
      access_token,
      name: text,
      limit: '20'
    };

    if (text && text.length > 1 && access_token != undefined) {
      searchInspirationRequest(params);
    }
  }

  onSetting = () => {

  }

  /*
  ** This method is called when user taps masked view while searching
  */
  onTapCoveredView = () => {
    this.setState({ isSearching: false });
    Keyboard.dismiss();
  }

  render() {
    const { navigation } = this.props;
    const { isSearching, isShownSetting, searchResult, isWaitingSearchResult } = this.state;

    return (
      <BaseView>
        <SafeAreaView style={styles.header}>
          <StatusBar barStyle='dark-content' />
          <SearchBar
            isWaitingSearchResult={isWaitingSearchResult}
            onFocusSearch={() => this.onFocusSearch()}
            onChangeSearchText={text => this.onChangeSearchText(text)}
            onSetting={() => this.onSetting()}
            onEndEditing={() => Keyboard.dismiss()}
          />
        </SafeAreaView>
        <RecipeContent
          navigation={navigation}
          isEnabled={!isSearching}
          searchResult={isSearching ? searchResult : []}
          onTapCoveredView={() => this.onTapCoveredView()}
        />
      </BaseView>
    );
  }

}

const mapDispatchToProps = {
	searchInspirationRequest,
};

const mapStateToProps = state => {
  const { auth, inspiration } = state.reducer;

  return {
    userData: auth.userData,
    isWaitingSearchResult: inspiration.isLoading,
    searchResult: inspiration.searchResult,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);