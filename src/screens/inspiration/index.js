// Inspiration

import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Platform, Image, ScrollView, Keyboard } from 'react-native';
import StarRating from 'react-native-star-rating';

import BaseComponent from '../base';
import { AvoText, AvoDropdown, AvoSearch } from '../../components';
import { InspirationHBar } from '../../components/inspiration';
import { Swipe, Setting, InspirationScroll } from './components';
import {
  ImageCancelTxt,
  IconHeartSwipe,
  IconSetting,
  IconClock
} from "../../assets/svg";

import { getRecipeSugRequest, likeDislikeRecRequest } from '../../actions/authActions';
import { searchInspirationRequest } from '../../actions/inspiration';

import constants from "../../const";
import styles from "./styles";

class Inspiration extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      currHight: 70,
      searchTxt: "",
      isRefresh: true,
      isSearchMode: false,
      searchResult: [],
      popupCount: 1,
      dialogShow: false,
      dialogShowSearch: false,
      recipeType: [
        { id: 1, name: `Entrée`, selected: false },
        { id: 1, name: `Omnivore`, selected: false },
        { id: 1, name: `Plat`, selected: false },
        { id: 1, name: `Entrée`, selected: false }
      ],
      DietType: [],
      filterList: [
        {
          id: 1,
          selected: "Category",
          list: ["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5"],
          dropStatus: false
        },
        {
          id: 1,
          selected: "Category",
          list: ["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5"],
          dropStatus: false
        },
        {
          id: 1,
          selected: "Category",
          list: ["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5"],
          dropStatus: false
        }
      ],
      entries: []
    };
  }

  componentDidMount() {
    const {
      isWaiting,
      navigation,
      id,
      error,
      userData,
      getRecipeSugRequest
    } = this.props;

    navigation.addListener("didFocus", () => {
      if (
        userData != undefined &&
        Object.keys(userData).length > 0 &&
        isWaiting == false &&
        this.state.entries.length < 1
      ) {
        params = {
          access_token: userData.access_token,
          limit: 20
        };
        if (this.state.entries.length < 1) {
          getRecipeSugRequest(params);
          constants.showLoader.showLoader();
        }
        if (
          userData.filters.diets != undefined &&
          typeof userData.filters.diets == "object"
        ) {
          dietsKeys = Object.keys(userData.filters.diets);
          arr = [];
          dietsKeys.map((item, index) => {
            var isCheck = false;
            var node = {
              selected: isCheck,
              name: userData.filters.diets[item],
              key: item
            };
            arr.push(node);
          });
          this.setState({
            DietType: arr
          });
        }
      } else if (error != "") {
        //alert(error);
      }
    });
  }
  componentDidUpdate = () => {
    const { suggestionArr, isWaiting, searchResult } = this.props;

    if (isWaiting) {
      constants.showLoader.showLoader();
    } else {
      constants.showLoader.hideLoader();
    }
    if (
      suggestionArr != undefined &&
      suggestionArr != null &&
      typeof suggestionArr.recipes == "object"
    ) {
      try {
        arr = [];
        suggestionArr.recipes.map((itm, ind) => {
          arrNode = {
            id: itm.id,
            time: itm.total_time + " minutes",
            views: itm.reviews.length + " avis",
            rating: 4,
            description: itm.name,
            imgUri: itm.picture[constants.FIX_CONST.RECIPE_THUMB_SIZE],
            suggestion: itm
          };
          arr.push(arrNode);
        });

        if (
          this.state.isRefresh &&
          JSON.stringify(this.state.entries) != JSON.stringify(arr)
        ) {
          this.setState({
            entries: arr,
            isRefresh: false
          });
        }
      } catch (e) {
        alert(e.toString());
      }
    }
    if (searchResult != undefined && typeof searchResult == 'object' && this.state.searchTxt.length > 1) {
      var arr = [];
			searchResult.map((itm, ind) => {
        arr.push(itm);
      });
      if (JSON.stringify(arr) != JSON.stringify(this.state.searchResult)) {
        this.setState({ searchResult: arr });
      }
    }
  };

  onSwipeRight = (item, index) => {
    const { likeDislikeRecRequest, userData, getRecipeSugRequest } = this.props;
    const { entries } = this.state;
    var params = {
      access_token: userData.access_token,
      typeUrl: 0,
      id: item.suggestion.uid
    };

    likeDislikeRecRequest(params);

    var entriesArr = entries;
    delete entriesArr[index];
    this.setState({ entries: entriesArr });

    if (entriesArr.length < 1) {
      var params = {
        access_token: userData.access_token,
        limit: 20
      };
      getRecipeSugRequest(params);
      this.setState({ isRefresh: true });
    }
  };

  onSwipeLeft = (item, index) => {
    const { likeDislikeRecRequest, userData, getRecipeSugRequest } = this.props;
    const { entries } = this.state;
    var params = {
      access_token: userData.access_token,
      typeUrl: 1,
      id: item.suggestion.uid
    };

    likeDislikeRecRequest(params);

    var entriesArr = entries;
    delete entriesArr[index];
    this.setState({ entries: entriesArr });

    if (entriesArr.length < 1) {
      var params = {
        access_token: userData.access_token,
        limit: 20
      };
      getRecipeSugRequest(params);
      this.setState({ isRefresh: true });
    }
  };

  onSearch = (text) => {
    this.setState({ searchTxt: text });
    this.searchInd(text);
  }

  onBtnSearchClose = () => {
    this.setState({ isSearchMode: false });
    Keyboard.dismiss();
  }

  renderNoMoreCards = () => {
    return (
      <View
        style={{
          paddingTop: constants.screen.height * 0.4,
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        {this.props.isWaiting != true && (
          <AvoText
            style={{ fontSize: constants.sizes.TXT_SIZE }}
            text={`Il n'y a pas d'éléments à afficher`}
          />
        )}
      </View>
    );
  };
  intervalTimer = null;
  touchTime = 0;
  _renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push("ItemDetails", {
            id: item.suggestion.uid
          });
        }}
        activeOpacity={0.9}
        style={styles.slide}
      >
        <View>
          <Image
            style={styles.viewImg}
            source={{ uri: item.imgUri }}
          />
          <TouchableOpacity
          // onPress={() => {
          // 	this.props.navigation.push('ItemDetails', { id: item.suggestion.uid });
          // }}
          >
            <AvoText
              style={styles.descTxt}
              fontWeight="bold"
              text={item.description}
            />
          </TouchableOpacity>
          <View style={styles.rowContainerTime}>
            <View style={styles.rowView}>
              <IconClock
                width={constants.screen.width * 0.05}
                height={constants.screen.width * 0.05}
              />
              <AvoText
                style={{
                  marginHorizontal: 5,
                  marginTop: Platform.OS == "android" ? 0 : 3,
                  fontSize: constants.sizes.TXT_SIZE - 2,
                  color: "black"
                }}
                fontWeight="normal"
                text={item.time}
              />
            </View>
            <View style={styles.rowView}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating}
                starSize={12}
                fullStarColor={"yellow"}
                emptyStarColor={"grey"}
                starStyle={{ marginHorizontal: 1 }}
              />
              <AvoText
                style={{
                  marginHorizontal: 5,
                  marginTop: Platform.OS == "android" ? 0 : 3,
                  fontSize: constants.sizes.TXT_SIZE - 2,
                  color: "black"
                }}
                fontWeight="normal"
                text={item.views}
              />
            </View>
          </View>
        </View>
        <View style={[styles.borderStyle, { marginVertical: 0 }]} />
        <View style={[styles.rowContainer, { justifyContent: 'space-between', marginVertical: 15 }]}>
          <TouchableOpacity
            onPress={() => { this.refApp.forceSwipe(index, "left") }}
            style={[
              styles.rowContainer,
              { justifyContent: "center", width: "45%", marginBottom: 5 }
            ]}
          >
            <ImageCancelTxt height={25} />
            <AvoText
              style={{
                marginHorizontal: 10,
                fontSize: constants.sizes.TXT_SIZE,
                color: "#7283A7"
              }}
              fontWeight="light"
              text={`Je n'aime pas`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.refApp.forceSwipe(index, "right");
            }}
            style={[
              styles.rowContainer,
              { justifyContent: "center", width: "45%", marginBottom: 0 }
            ]}
          >
            <IconHeartSwipe height={20} />
            <AvoText
              style={{
                marginHorizontal: 10,
                fontSize: constants.sizes.TXT_SIZE,
                color: "#FF784C"
              }}
              fontWeight="light"
              text={`J'aime`}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  searchInd = searchTxt => {
    const { searchInspirationRequest, userData } = this.props;
    const params = {
      access_token: userData.access_token,
      name: searchTxt,
      limit: '20'
    };

    if (
      searchTxt &&
      searchTxt.length > 1 &&
      userData.access_token != undefined
    ) {
      searchInspirationRequest(params);
    }
  };

  renderSearchItem = (item, index) => {
    const { navigation } = this.props;
    const { name, uid } = item;

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        onPress={() => { navigation.navigate('ItemDetails', { id: uid }) }}
      >
        <AvoText
          text={name}
          style={{
            marginLeft: 10,
            fontSize: constants.sizes.TXT_SIZE,
            marginVertical: 10,
            color: constants.colors.tint
          }}
          fontWeight="normal"
        />
      </TouchableOpacity>
    )
  }

  refApp = null;
  render() {
    const { isSearching, navigation } = this.props;
    const { searchResult, isSearchMode, dialogShow, recipeType, DietType, popupCount, entries } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <View style={constants.styles.wrapper}>
            <AvoSearch
              autoFocus={false}
              isWaiting={isSearching}
              placeholder={"Rechercher dans mon livre de recettes"}
              onFocus={() => { this.setState({ isSearchMode: true }) }}
              onChangeText={(text) => { this.onSearch(text) }}
              onEndEditing={() => { }}
            />
          </View>
          <TouchableOpacity
            style={styles.settingBtn}
            onPress={() => { this.setState({ dialogShow: true }) }}
          >
            <IconSetting />
          </TouchableOpacity>
        </View>

        <View style={styles.contentWrapper}>
          <InspirationScroll
            data={entries}
            navigation={navigation}
            isSearching={isSearchMode}
            onSwipeLeft={(item, index) => this.onSwipeLeft(item, index)}
            onSwipeRight={(item, index) => this.onSwipeRight(item, index)}
          />
          {
            isSearchMode &&
              <View style={styles.searchBoard}>
                <ScrollView>
                  {
                    searchResult.map((item, index) =>
                      this.renderSearchItem(item, index)
                    )
                  }
                </ScrollView>
                <View style={constants.styles.row}>
                  <View style={constants.styles.wrapper} />
                  <TouchableOpacity
                    style={styles.searchClose}
                    onPress={() => { this.onBtnSearchClose() }}
                  >
                    <AvoText
                      text='Close'
                      style={styles.closeTitle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
          }
        </View>

        <Setting
          FilterPopup={dialogShow}
          recipeType={recipeType}
          DietType={DietType}
          popupCount={popupCount}
          onFilterPopupDismiss={() => { this.setState({ dialogShow: false }) }}
          onFilterPopupGo={() => { this.setState({ dialogShow: false }) }}
          onRecipePress={ind => {
            recipeType[ind].selected = !recipeType[ind].selected;
            this.setState({ recipeType });
          }}
          onDietPress={index => {
            DietType.map((itm, ind) => {
              DietType[ind].selected = false;
            });
            DietType[index].selected = !DietType[index].selected;
            this.setState({ DietType });
          }}
          onPopupCountPress={type => {
            if (type == 0) {
              this.setState({
                popupCount:
                  this.state.popupCount > 1 ? this.state.popupCount - 1 : 1
              });
            } else {
              this.setState({
                popupCount: this.state.popupCount + 1
              });
            }
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
	getRecipeSugRequest,
	searchInspirationRequest,
	likeDislikeRecRequest
};

const mapStateToProps = state => {
  const { auth, inspiration } = state.reducer;

  return {
    isWaiting: auth.isWaiting,
    isSearching: inspiration.isLoading,
    accessToken: auth.accessToken,
    id: auth.id,
    error: auth.eMessage,
    userData: auth.userData,
    suggestionArr: auth.suggestionArr,
    searchResult: inspiration.searchResult,
    isRecipeStatusUpdate: auth.isRecipeStatusUpdate
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inspiration);
