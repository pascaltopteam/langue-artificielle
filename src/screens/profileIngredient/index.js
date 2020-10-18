// Profile Allergies

import React from "react";
import { connect } from 'react-redux';
import { View } from "react-native";

import BaseComponent from "../base";
import { BaseView, Header, AvoButton, Block } from '../../components';
import SearchSettingPopup from '../../components/searchSettingPopup';
import Ingredient from "./components/ingredient";

import { searchInspirationRequest, updateProfileRequest } from '../../actions';

import styles from "./styles";
import constants from "../../const";

class ProfileIngredient extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      dialogShowSearch: false,
      searchTxt: "",
      searchResult: [],
      allergyFood: []
    };
  }

  componentDidMount = () => {
    const { error, userData } = this.props;

    if (this.isObjectAvailable(userData)) {
      const { ingredients_disliked } = userData;
      var array = [];

      ingredients_disliked.map((item) => {
        array.push({
          isCheck: true,
          title: item.name,
          key: item.id
        });
      });
      this.setState({ allergyFood: array });
    } else if (error != "") {
      //constants.DropDownAlert.showDropdownAlert('error', 'Allergies', error);
    }
  };

  componentDidUpdate = prev => {
    const { profileUpdate, searchIndArr, navigation, searchResult } = this.props;
    const { searchTxt } = this.state;

    if (prev.profileUpdate != profileUpdate && profileUpdate == true) {
      navigation.pop();
    }

    if (this.isObjectAvailable(searchResult) && searchTxt.length > 1) {
      var array = [];
      searchResult.map((item) => {
        array.push(item);
      });
      if (JSON.stringify(array) != JSON.stringify(searchResult)) {
        this.setState({ searchResult: array });
      }
    }
  };

  onSearch = text => {
    const { searchInspirationRequest, userData } = this.props;

    if (this.isObjectAvailable(userData) && text.length > 1) {
      const params = {
        access_token: userData.access_token,
        name: text,
        limit: '20'
      };
      this.setState({ searchTxt: text });
      searchInspirationRequest(params);
    }
  }

  updateProfile = () => {
    const { navigation, updateProfileRequest, userData } = this.props;
    const { allergyFood } = this.state;
    const { access_token } = userData;

    if (!this.isValueAvailable(access_token)) return;

    var array = [];
    allergyFood.map((item) => {
      if (item.isCheck) array.push(item.key);
    });
    var params = {
      access_token,
      ingredients_disliked: array
    };
    updateProfileRequest(params);
    navigation.pop();
  };

  render() {
    const { navigation, isSearching, searchResult } = this.props;
    const { searchTxt, allergyFood } = this.state;

    return (
      <BaseView>
        <Header
          title={`Ingrédient(s) que je n'aime pas`}
          navigation={navigation}
          isBack
        />
        <View style={styles.container}>
          <Ingredient
            title={`Pas de ça dans mon plat !`}
            searchResult={searchResult}
            isWaiting={isSearching}
            onSearch={text => this.onSearch(text)}
            onPressEnd={() => { this.updateProfile() }}
          />
        </View>
      </BaseView>
    );
  }
}
const mapStateToProps = state => {
  const { auth, inspiration } = state.reducer;
  const { searchResult, isLoading } = inspiration;

  return {
    isWaiting: auth.isWaiting,
    id: auth.id,
    error: auth.eMessage,
    profileUpdate: auth.profileUpdate,
    userData: auth.userData,
    searchIndArr: auth.searchIndArr,
    searchResult,
    isSearching: isLoading
  };
};

const mapDispatchToProps = { 
  updateProfileRequest, 
  searchInspirationRequest 
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIngredient);
