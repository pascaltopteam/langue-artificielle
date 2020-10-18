// Profile Home

import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import Swiper from "react-native-swiper";

import BaseComponent from "../base";
import { BaseView, Header, AvoText } from "../../components";
import Household from "../profileHome/components/household";
import Diet from "../profileHabit/components/diet";
import Alergy from "../profileAllergy/components/allergy";
import Ingredient from "../profileIngredient/components/ingredient";
import Dots from "./dots";

import { 
  updateUserProfile, 
  searchInspirationRequest,
  updateProfileRequest,
  setFamilyRequest
} from '../../actions';

import styles from "./styles";
import constants from "../../const";

class Welcome extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      isSwipeEnable: true,
      offsetX: 0,
      fullName: "",
      isBackHidden: false,
      isForwardHidden: true,
      adultNumber: 1,
      childNumber: 1,
      DietFood: [],
      allergyFood: [],
      allergyFoodFilter: [],
      dialogShowSearch: false,
      searchResult: [],
      searchTxt: "",
      searchAllergyTxt: ""
    };
  }

  componentDidMount = () => {
    const { userData } = this.props;
    const allergies = Object.keys(userData.filters.allergies);
    const diets = Object.keys(userData.filters.diets)

    if (userData) {
      var fullName = userData.firstname && userData.firstname != null ? userData.firstname : "";
      fullName = `${fullName} ${userData.lastname && userData.lastname != null ? userData.lastname : ""}`;
      this.setState({ fullName });
    }

    var array = [];

    if (userData && userData.filters) {
      if (allergies.length && allergies.length > 0) {
        array = [];
        allergies.map((item, index) => {
          var node = {
            isCheck: false,
            title: userData.filters.allergies[item],
            key: item
          };
          array.push(node);
        });
        this.setState({ allergyFood: array });
      }
      if (diets.length && diets.length > 0) {
        dietsKeys = diets;
        array = [];
        dietsKeys.map((item, index) => {
          var node = {
            isCheck: false,
            title: userData.filters.diets[item],
            key: item
          };
          array.push(node);
        });
        this.setState({ DietFood: array });
      }
    }
  };

  componentDidUpdate = prev => {
    const { 
      userData, 
      profileUpdate, 
      searchResult, 
      navigation, 
      isFamilyUpdate, 
      isProfileUpdate, 
      family,
      profileData,
      errorProfile 
    } = this.props;
    const { searchTxt } = this.state;

    if (errorProfile && errorProfile != prev.errorProfile) {
      console.log(errorProfile);
    }

    if (this.isTrue(isFamilyUpdate) && isFamilyUpdate != prev.isFamilyUpdate && this.isObjectAvailable(family)) {
      var user = userData;
      const { family_members } = user;
      if (this.isObjectAvailable(family_members)) {
        user.family_members.adult = family.adult;
        user.family_members.child = family.child;
        updateUserProfile(user);
      }
    }

    if (this.isTrue(isProfileUpdate) && isProfileUpdate != prev.isProfileUpdate && this.isObjectAvailable(profileData)) {
      const user = {
        ...profileData,
        access_token: userData.access_token
      };
      updateUserProfile(user);
    }

    if (prev.profileUpdate != profileUpdate && profileUpdate == true) {
      navigation.navigate("Main");
    }
    if (searchResult != undefined && typeof searchResult == "object" && searchTxt.length > 1) {
      var array = [];
      searchResult.map((itm, ind) => {
        array.push(itm);
      });
      if (JSON.stringify(array) != JSON.stringify(this.state.searchResult)) {
        this.setState({ searchResult: array });
      }
    }
  };

  onBtnForward = () => {
    const { index, isSwipeEnable } = this.state;

    if (index == 0) { 
      this.updateFamily(true);
      return;
    } else if (index >= 3) {
      return;
    }

    if (isSwipeEnable) {
      this.swiperRef.scrollTo(index + 1, true);
      this.setState({ index: index + 1 });
    } else {
      constants.DropDownAlert.showDropdownAlert(
        "error",
        "Family Member",
        `Please select at least one adult and one child`
      );
    }
  };

  onBtnBackward = () => {
    const { index } = this.state;

    if (index > 0) {
      this.swiperRef.scrollTo(index - 1, true);
      this.setState({ index: index - 1 });
    }
  };

  onSearch = text => {
    const { searchInspirationRequest, userData } = this.props;
    const params = {
      access_token: userData.access_token,
      name: text,
      limit: '20'
    };

    if (
      text &&
      text.length > 1 &&
      userData.access_token != undefined
    ) {
      this.setState({ searchTxt: text });
      searchInspirationRequest(params);
    }
  }

  onPressAdult = index => {
    this.setState({
      isSwipeEnable: true,
      adultNumber: index + 1
    });
  }

  onPressChild = index => {
    this.setState({
      isSwipeEnable: true,
      childNumber: index + 1
    });
  }

  searchAllergy = searchTxt => {
    var array = [];
    searchTxt = searchTxt.toLowerCase();
    this.state.allergyFood.map((mapItm, mapIndex) => {
      var titleTxt = mapItm.title.toLowerCase();
      if (titleTxt.includes(searchTxt)) {
        array.push(mapItm);
      }
    });
    this.setState({ allergyFoodFilter: array });
  };

  updateFamily = isNav => {
    const { setFamilyRequest, userData } = this.props;
    const { adultNumber, childNumber, index } = this.state;

    if (userData != undefined && Object.keys(userData).length > 0) {
      setFamilyRequest({
        adult: adultNumber,
        child: childNumber,
        access_token: userData.access_token
      });

      if (isNav) {
        this.swiperRef.scrollTo(index + 1, true);
        this.setState({ index: index + 1 });
      }
    } else {
      constants.DropDownAlert.showDropdownAlert(
        "error",
        "Family Member",
        `Please select at least one adult and one child`
      );
    }
  };

  updateProfile = () => {
    const { updateProfileRequest, userData, navigation } = this.props;
    const { DietFood, allergyFood } = this.state;

    if (!userData.access_token) return;

    var dietArray = [];
    var allergyArray = [];
    DietFood.map((item, index) => {
      if (item.isCheck)  dietArray.push(item.key);
    });
    allergyFood.map((item, index) => {
      if (item.isCheck) allergyArray.push(item.key);
    });
    const params = {
      access_token: userData.access_token,
      diet: dietArray,
      allergies: allergyArray
    };
    updateProfileRequest(params);
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [ NavigationActions.navigate({ routeName: 'Main' }) ]
      })
    );
  };

  render() {
    const { navigation, isSearching } = this.props;
    const {
      index,
      isSwipeEnable,
      fullName,
      DietFood,
      allergyFood,
      searchAllergyTxt,
      searchResult,
    } = this.state;

    return (
      <BaseView>
        <Header
          title="Parameter mon profil"
          navigation={navigation}
        />
        <View style={styles.title}>
          <AvoText
            style={styles.swiperDescTitle}
            fontWeight="museo"
            text={`Bonjour ${fullName} !`}
          />
        </View>
        <Swiper
          ref={ref => (this.swiperRef = ref)}
          loop={false}
          scrollEnabled={isSwipeEnable}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={false}
          onIndexChanged={indChange => {
            this.setState({ index: indChange });
            if (indChange == 0 || indChange == 1) {
              this.updateFamily(false);
            }
          }}
          buttonWrapperStyle={styles.buttonWrapperStyle}
          dot={<View style={styles.circle} />}
          activeDot={<View style={styles.bigCircle} />}
          style={styles.wrapper}
        >
          <View style={styles.wrapperHCenter}>
            <Household
              onPressAdult={index => this.onPressAdult(index)}
              onPressChild={index => this.onPressChild(index)}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Diet
              onPress={(itm, ind) => {
                DietFood.map((im, inmInd) => {
                  DietFood[inmInd].isCheck = false;
                });
                DietFood[ind].isCheck = !DietFood[ind].isCheck;
                this.setState({ food: DietFood });
              }}
              food={DietFood}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Alergy
              onChangeSearchText={searchAllergyTxt => {
                this.searchAllergy(searchAllergyTxt);
                this.setState({ searchAllergyTxt });
              }}
              onPress={(itm, ind) => {
                allergyFood.map((mapItm, mapIndex) => {
                  if (itm.key == mapItm.key) {
                    allergyFood[mapIndex].isCheck = !allergyFood[mapIndex].isCheck;
                    this.setState({ allergyFood });
                  }
                });
              }}
              title={`As-tu des allergies ? On va éviter les recettes qui font mal …`}
              allergyFood={searchAllergyTxt == "" ? allergyFood : allergyFoodFilter}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Ingredient
              title={`Pas de ça dans mon plat !`}
              searchResult={searchResult}
              isWaiting={isSearching}
              onSearch={text => this.onSearch(text)}
              onPressEnd={() => { this.updateProfile() }}
            />
          </View>
        </Swiper>
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", width: constants.screen.width / 3 }}>
            {
              index > 0 &&
              <TouchableOpacity
                onPress={() => { this.onBtnBackward() }}
              >
                <AvoText style={styles.back} text="Passer" />
              </TouchableOpacity>
            }
            <View style={styles.wrapperCenter} />
          </View>
          <View style={styles.wrapperCenter}>
            <Dots index={index} />
          </View>
          <View
            style={{ flexDirection: "row", width: constants.screen.width / 3 }}
          >
            <View style={styles.wrapperCenter} />
            {
              index < 3 &&
              <TouchableOpacity
                onPress={() => { this.onBtnForward() }}
              >
                <AvoText style={styles.forward} text="Suivant" />
              </TouchableOpacity>
            }
          </View>
        </View>
      </BaseView>
    );
  }
}
const mapStateToProps = state => {
  const { auth, inspiration, profile } = state.reducer;
  const { userData } = auth;
  const { error, profileData, isFamilyUpdate, isProfileUpdate, family } = profile;

  return {
    isWaiting: auth.isWaiting,
    id: auth.id,
    error: auth.eMessage,
    profileUpdate: profile.profileUpdate,
    userData,
    isSearching: inspiration.isLoading,
    searchResult: inspiration.searchResult,
    profileData,
    isFamilyUpdate,
    isProfileUpdate,
    family,
    errorProfile: error
  };
};

const mapDispatchToProps = {
  updateUserProfile,
  updateProfileRequest,
  setFamilyRequest,
  searchInspirationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
