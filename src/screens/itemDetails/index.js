// Second Screen

import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, FlatList, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import Timeline from 'react-native-timeline-flatlist';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import BaseComponent from '../base';
import { BaseView, AvoText } from '../../components';
import { Header } from './components';
import {
  updateFavoriteRequest,
  getRecipeByIdRequest,
  addToMenuRequest,
  deleteFavoriteRequest,
  getFavoritesRequest
} from '../../actions';
import {
  IconBack,
  IconHeartPopIcon,
  IconHeart,
  IconFoodBG,
  IconClock,
  IconCooker,
  IconForkKnife,
  IconWorld,
  IconMinus,
  IconPlus,
  PlaceholderImg,
  IconBellPopup,
  ImageHeader,
  ImageHeaderX
} from '../../assets/svg';
import constants from '../../const';
import styles from './styles';

class ItemDetails extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      opacity: 0,
      showHeader: false,
      name: '',
      currentStap: 1,
      servingsCount: 0,
      uid: '',
      preparationTime: 0,
      ingredientListLive: [],
      cookingTime: 0,
      dialogShow: false,
      imgUrl: '',
      recipeStatus: [],
      animation: new Animated.Value(0),
      ingredientList: [],
      carbonFoot: 0,
      season: false,
      ingredients: [{ id: 1, name: 'De saison' }],
      imageHeight: constants.screen.width / 1.4,
      isBooked: false
    };
  }

  componentDidMount() {
    const { navigation, userData, getRecipeByIdRequest } = this.props;
    const uid = navigation.state.params.id;
    const { access_token } = userData;

    if (uid != undefined) {
      const params = { access_token, uid };
      getRecipeByIdRequest(params);
    }
  }

  componentDidUpdate = prevProps => {
    const {
      isAdded,
      isLoadingFavorite,
      isLoadingRecipe,
      recipeObject,
      isAddedMenu,
      isLoadingMenu,
      error,
      isDeleted,
      userData,
      getFavoritesRequest
    } = this.props;

    if (isLoadingRecipe) {
      constants.showLoader.showLoader();
    } else {
      if (isLoadingMenu) {
        constants.showLoader.showLoader();
      } else {
        constants.showLoader.hideLoader();
        // if (isLoadingFavorite) {
        //   constants.showLoader.showLoader();
        // } else {
        //   constants.showLoader.hideLoader();
        // }
      }
    }

    if (prevProps.isAddedMenu != isAddedMenu && isAddedMenu) {
      constants.DropDownAlert.showDropdownAlert('success', 'Success', `Recette ajoutée :)`);
    }

    if (isAdded && prevProps.isAdded != isAdded) {
      const { access_token } = userData;
      getFavoritesRequest({ access_token });
    }

    if (isDeleted && prevProps.isDeleted != isDeleted) {
      const { access_token } = userData;
      getFavoritesRequest({ access_token });
    }

    if (!this.isObjectAvailable(recipeObject) || recipeObject == prevProps.recipeObject) return;

    const { recipe } = recipeObject;
    if (!this.isObjectAvailable(recipe)) return;

    const { ingredients, description } = recipe;
    if (!this.isArrayAvailable(description)) return;

    var array = [];
    const icon = require('../../assets/images/unSelected.png');

    description.map((item, index) => {
      const node = {
        id: index + 1,
        time: '',
        lineColor: constants.colors.grey,
        icon,
        description: '',
        title: item
      }
      array.push(node);
    });

    const { uid, name, picture, season, servings, carbon_footprint, preparation_time, cook_time, favorited } = recipe;
    this.setState({
      season: this.isValueAvailable(season) ? season : false,
      count: servings,
      servingsCount: servings,
      imgUrl: picture[constants.FIX_CONST.RECIPE_THUMB_SIZE],
      ingredientList: ingredients,
      ingredientListLive: ingredients,
      recipeStatus: array,
      carbonFoot: carbon_footprint,
      name: name,
      preparationTime: preparation_time,
      cookingTime: cook_time,
      uid,
      isBooked: favorited
    });
  };

  addToMenu = () => {
    const { error, userData, addToMenuRequest, navigation } = this.props;
    const { uid } = this.state;

    if (!this.isObjectAvailable(userData)) return;

    const { access_token } = userData;
    const params = {
      access_token,
      main_course_uid: uid
    };
    addToMenuRequest(params);
  };

  onEventComplete = (event) => {
    var isComp = false;
    var arr = [];
    this.state.recipeStatus.map((itm, ind) => {
      var arrNode = itm;

      if (isComp) {
        arrNode.lineColor = constants.colors.grey;
        arrNode.icon = require('../../assets/images/unSelected.png');
      } else {
        arrNode.lineColor = constants.colors.tint;
        arrNode.icon = require('../../assets/images/selected.png');
      }
      if (itm.id == event.id) {
        isComp = true;
      }
      arr.push(arrNode);
    });
    this.setState({
      recipeStatus: arr
    });
  };

  renderIngredients = ({ item, index }) => {
    return (
      <View key={index} style={styles.tag}>
        <AvoText
          style={styles.ingrTxt}
          fontWeight="light"
          text={item.name}
        />
      </View>
    );
  };

  dialogPop = () => {
    return (
      <Dialog
        containerStyle={{ justifyContent: 'flex-end' }}
        onDismiss={() => {
          this.setState({ dialogShow: false });
        }}
        rounded
        dialogStyle={{
          backgroundColor: 'rgba(0,0,0,0)'
        }}
        width={1}
        onTouchOutside={() => {
          this.setState({ dialogShow: false });
        }}
        visible={this.state.dialogShow}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
      >
        <DialogContent style={{ paddingVertical: 50 }}>
          <View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 25 }}>
            <IconBellPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={`Souhaitez-vous ajouter cette recette à votre menu ?`}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    dialogShow: false
                  },
                  () => {
                    //this.props.navigation.navigate('RecipeType');
                    this.addToMenu();
                  }
                );
              }}
              style={[styles.btnStyle, { backgroundColor: constants.colors.tint }]}
            >
              <AvoText style={[styles.recipeTxt, { color: 'white' }]} fontWeight="bold" text={`Oui`} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  dialogShow: false
                });
              }}
              style={[styles.btnStyle, { backgroundColor: 'white' }]}
            >
              <AvoText
                style={[styles.recipeTxt, { color: constants.colors.grey }]}
                fontWeight="bold"
                text={`Non merci`}
              />
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
    );
  };

  ingredientDec = () => {
    const { ingredientListLive, count } = this.state;
    const countOf = count > 1 ? count - 1 : 1;
    var array = [];

    ingredientListLive.map((item) => {
      var totalQty = 0;
      var unit = item.unit;
      if (this.isInt(item.quantity) || this.isFloat(item.quantity)) {
        var qtyOne = item.quantity / this.state.servingsCount;
        totalQty = qtyOne * countOf;
        if (item.unit.toString().toLowerCase() == 'g') {
          unit = totalQty > 999 ? 'kg' : unit;
          totalQty = totalQty > 999 ? totalQty / 1000 : totalQty;
        } else if (item.unit.toString().toLowerCase() == 'kg') {
          unit = totalQty < 1 ? 'g' : unit;
          totalQty = totalQty < 1 ? totalQty * 1000 : totalQty;
        }
        totalQty = this.isInt(totalQty) ? totalQty : parseFloat(totalQty).toFixed(2);
      } else {
        totalQty = null;
      }
      array.push({ ...item, quantity: totalQty, unit: unit });
    });

    this.setState({
      ingredientList: array,
      count: countOf
    });
  };

  ingredientInc = () => {
    const { ingredientListLive, count } = this.state;
    const countOf = count + 1;
    var array = [];

    ingredientListLive.map((item) => {
      var totalQty = 0;
      var unit = item.unit;
      if (this.isInt(item.quantity) || this.isFloat(item.quantity)) {
        var qtyOne = item.quantity / this.state.servingsCount;
        totalQty = qtyOne * countOf;
        if (item.unit.toString().toLowerCase() == 'g') {
          unit = totalQty > 999 ? 'kg' : unit;
          totalQty = totalQty > 999 ? totalQty / 1000 : totalQty;
        } else if (item.unit.toString().toLowerCase() == 'kg') {
          unit = totalQty < 1 ? 'g' : unit;
          totalQty = totalQty < 1 ? totalQty * 1000 : totalQty;
        }
        totalQty = this.isInt(totalQty) ? totalQty : parseFloat(totalQty).toFixed(2);
      } else {
        totalQty = null;
      }
      array.push({ ...item, quantity: totalQty, unit: unit });
    });
    this.setState({
      ingredientList: array,
      count: countOf
    });
  };

  onScrollEvent = event => {
    const originalHeight = constants.screen.width / 1.4;
    var offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 0) {
      this.setState({ imageHeight: originalHeight - offsetY });
    } else {
      this.setState({ imageHeight: originalHeight });
    }
  };

  addToFev = () => {
    const { userData, updateFavoriteRequest, deleteFavoriteRequest } = this.props;
    const { uid, isBooked } = this.state;
    const { access_token } = userData;
    const params = {
      access_token,
      uid
    };
    if (isBooked) {
      this.setState({ isBooked: false });
      deleteFavoriteRequest(params);
    } else {
      this.setState({ isBooked: true });
      updateFavoriteRequest({ ...params, uid });
    }
  }

  renderContent = () => {
    const {
      name,
      season,
      ingredients,
      preparationTime,
      cookingTime,
      carbonFoot,
      recipeStatus,
      ingredientList,
      count
    } = this.state;

    return (
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => this.onScrollEvent(event)}
      >
        <View style={styles.content}>
          <AvoText
            style={styles.descTxtTitle}
            fontWeight="museo"
            text={name}
          />
          {
            season &&
            <FlatList
              style={{ width: constants.screen.width }}
              data={ingredients}
              renderItem={this.renderIngredients}
              extraData={this.state}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          }
          <View style={styles.rowContainerDetails}>
            <View style={styles.boxContainer}>
              <IconClock width={14} height={14} />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='bold'
                text="Préparation"
              />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='light'
                text={`${preparationTime} minutes`}
              />
            </View>
            <View style={styles.boxContainer}>
              <IconCooker width={23} height={14} />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='bold'
                text="Cuisson"
              />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='light'
                text={`${cookingTime} minutes`}
              />
            </View>
            <View style={styles.boxContainer}>
              <IconForkKnife width={13} height={14} />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='bold'
                text="Difficulté"
              />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='light'
                text="Moyenne"
              />
            </View>
          </View>
          <View style={styles.rowContainerCenter}>
            <IconWorld width={14} height={14} />
            <AvoText
              style={{ fontSize: 12, marginRight: 15, marginLeft: 10 }}
              fontWeight='bold'
              text="Emprunte carbone"
            />
            <AvoText
              style={{ fontSize: 12 }}
              fontWeight='light'
              text={`${carbonFoot}g / portion`}
            />
          </View>
          <View style={styles.borderStyle} />
          <View style={styles.rowContainerDetails}>
            <View style={{ flex: 1 }}>
              <AvoText
                style={styles.title}
                fontWeight='museo'
                text={`Ingrédients`}
              />
              <AvoText
                style={{ fontSize: 14, marginTop: 7 }}
                fontWeight='light'
                text="Choisissez le nb. de personnes"
              />
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.optBtn, { marginRight: 10 }]}
                onPress={() => this.ingredientDec()}
              >
                <IconMinus width={15} height={15} />
              </TouchableOpacity>
              <AvoText
                style={{
                  width: 30,
                  textAlign: 'center',
                  marginTop: 2,
                  color: 'black',
                  fontSize: 18
                }}
                fontWeight="Bold"
                text={count.toString()}
              />
              <TouchableOpacity
                onPress={() => this.ingredientInc()}
                style={[styles.optBtn, { marginLeft: 10 }]}
              >
                <IconPlus width={15} height={15} />
              </TouchableOpacity>
            </View>
          </View>
          {
            ingredientList.map((recItem, recIndex) =>
              <View
                key={recIndex}
                style={[styles.rowContainerDetails, { marginVertical: 5 }]}
              >
                <PlaceholderImg width={38} height={38} />
                <AvoText
                  style={styles.flexTxt}
                  fontWeight="bold"
                  text={recItem.name}
                />
                <AvoText
                  style={styles.flexTxtLight}
                  fontWeight='bold'
                  text={`${recItem.quantity ? recItem.quantity + ' ' : ''}${recItem.unit}`}
                />
              </View>
            )
          }
          <View style={styles.borderStyle} />
          <AvoText
            style={styles.title}
            fontWeight="museo"
            text={'Recette'}
          />
          <Timeline
            style={{ marginTop: 10 }}
            onEventPress={(event) => this.onEventComplete(event)}
            titleStyle={[styles.timeline, { marginVertical: 10 }]}
            circleSize={20}
            innerCircle={'icon'}
            circleColor={'#fff'}
            showTime={false}
            data={recipeStatus}
            options={{ bounces: false }}
          />
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    );
  };

  renderHeader = (animatedStyle) => {
    const { navigation } = this.props;
    const { isBooked } = this.state;
    const padding = { padding: 10 };
    const width = constants.screen.width * 0.12;

    return (
      <Animated.View style={[styles.containerHeader, animatedStyle]}>
        <View style={styles.bg}>
          {
            constants.isIphoneX ?
              <ImageHeaderX width={styles.bg.width} height={styles.bg.height} />
              :
              <ImageHeader width={styles.bg.width} height={styles.bg.height} />
          }
        </View>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity
            style={padding}
            activeOpacity={0.8}
            onPress={() => navigation.pop()}
          >
            <IconBack width={width} height={width} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({ dialogShow: true })}
              style={{ padding: 10, marginRight: 10 }}
            >
              <IconFoodBG width={width} height={width} />
            </TouchableOpacity>
            <TouchableOpacity
              style={padding}
              activeOpacity={0.8}
              onPress={() => this.addToFev()}
            >
              {
                isBooked ?
                  <IconHeartPopIcon
                    width={width}
                    height={width}
                  />
                  :
                  <IconHeart
                    width={width}
                    height={width}
                  />
              }
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { animation, imgUrl, imageHeight, isBooked } = this.state;

    return (
      <View style={styles.container}>
        <FastImage
          style={[styles.headerImage, { height: imageHeight }]}
          source={{ uri: imgUrl }}
        />
        {this.renderContent()}
        <Header
          navigation={navigation}
          isBooked={isBooked}
          onPressHeart={() => this.addToFev()}
        />
        {this.dialogPop()}
      </View>
    );
  }
}

const mapDispatchToProps = {
  updateFavoriteRequest,
  getRecipeByIdRequest,
  addToMenuRequest,
  deleteFavoriteRequest,
  getFavoritesRequest
};

const mapStateToProps = (state) => {
  const { auth, menu, recipe, favorite } = state.reducer;
  const { userData } = auth;
  const { isAddedMenu } = menu;
  const { recipeObject } = recipe;
  const { error, isDeleted, isAdded } = favorite;

  return {
    userData,
    isLoadingFavorite: favorite.isLoading,
    isAddedMenu,
    isLoadingMenu: menu.isLoading,
    recipeObject,
    isLoadingRecipe: recipe.isLoading,
    error,
    isDeleted,
    isAdded
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);