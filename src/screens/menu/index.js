import React from "react";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler
} from "react-native";
import FastImage from "react-native-fast-image";
import Dialog, { SlideAnimation, DialogContent } from "react-native-popup-dialog";

import Charging from '../charging';
import BaseComponent from '../base';
import Base from "../../components/base";
import { Header, AvoText, AvoButton } from "../../components";
import { CircleText } from './components';
import {
  IconReplace,
  IconUtensil,
  IconDelete,
  IconATag,
  IconBTag,
  IconCTag,
  IconDTag,
  IconDelPopup,
  IconReplaceWhite,
  IconMinusGreen,
  IconPlusGreen,
  IconEditGrey,
  IconEditPopup
} from "../../assets/svg";

import {
  getMenuRequest,
  delMenuRequest,
  editGuestRequest
} from "../../actions";

import styles from "./styles";
import constants from "../../const";

class Menu extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dialogShow: false,
      dialogShowAdd: false,
      popupCount: 0,
      filterList: [],
      num1: 0,
      num2: 0
    };
  }

  selectedIndex = null;

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    const { navigation } = this.props;

    var id = 1;
    if (this.isObjectAvailable(navigation.state.params)) {
      id = navigation.state.params.id;
    }
    if (id != 0) this.getMenu();

    var num1 = 0, num2 = 0;
    while (num1 > 0 && num1 < 5) {
      num1 = Math.floor(Math.random() * 5);
    }
    while (num2 > 0 && num2 < 5 && num2 != num1) {
      num2 = Math.floor(Math.random() * 5);
    }

    this.setState({ num1, num2 });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentDidUpdate = prevProps => {
    const {
      isLoading,
      isEditing,
      menuData,
      userData,
      deleteMealStatus,
      editGuestStatus,
      isMenuGenerated,
      error,
      navigation
    } = this.props;
    const { filterList } = this.state;

    var id = 1;
    if (this.isObjectAvailable(navigation.state.params)) {
      id = navigation.state.params.id;
    }

    if (isEditing) {
      constants.showLoader.showLoader();
    } else {
      constants.showLoader.hideLoader();
    }

    if (isMenuGenerated && id == 0) {
      this.getMenu();
    }

    if (deleteMealStatus && prevProps.deleteMealStatus != deleteMealStatus) {
      constants.DropDownAlert.showDropdownAlert(
        "success",
        "Succès",
        `Nous avons retiré cette recette`
      );
      this.getMenu();
    }
    if (editGuestStatus && prevProps.editGuestStatus != editGuestStatus) {
      constants.DropDownAlert.showDropdownAlert(
        "success",
        "Succès",
        `Meal guest updated successfully`
      );
      this.getMenu();
    }

    if (error) {
      constants.DropDownAlert.showDropdownAlert(
        "error",
        "Attention",
        error.message
      );
    }

    if (this.isObjectAvailable(menuData) && 
        id == 0 &&
        isLoading == false &&
        isLoading != prevProps.isLoading
    ) {
      this.loadMenu();
    } else if (this.isObjectAvailable(menuData) && id != 0) {
      this.loadMenu();
    }
  };

  loadMenu = () => {
    var array = [];

    const { filterList } = this.state;
    const { menuData, userData } = this.props;
    const { meals } = menuData;
    const { family_members } = userData;
    const { adult, child } = family_members;
    var totalFamilyMember = 0;

    if (this.isValueAvailable(adult)) {
      totalFamilyMember += parseInt(adult);
    }
    if (this.isValueAvailable(child)) {
      totalFamilyMember += parseInt(child);
    }

    if (!this.isArrayAvailable(meals)) return;

    meals.map(meal => {
      var node = {};
      const { starter, servings, main_course, dessert, id } = meal;

      if (this.isObjectAvailable(starter)) {
        const { picture, uid, name } = starter;

        node = {
          mealId: id,
          uid,
          id: uid,
          person: servings,
          description: name,
          imgUri: this.isObjectAvailable(picture) ? picture[constants.FIX_CONST.RECIPE_THUMB_SIZE] : '',
          mealType: "starter"
        };

        array.push(node);
        node = {};
      }

      if (this.isObjectAvailable(main_course)) {
        const { picture, uid, name } = main_course;

        node = {
          mealId: id,
          uid,
          id: uid,
          person: servings,
          description: name,
          imgUri: this.isObjectAvailable(picture) ? picture[constants.FIX_CONST.RECIPE_THUMB_SIZE] : '',
          mealType: "main_course"
        };

        array.push(node);
        node = {};
      }

      if (this.isObjectAvailable(dessert)) {
        const { picture, uid, name } = dessert;

        node = {
          mealId: id,
          uid,
          id: uid,
          person: servings,
          description: name,
          imgUri: this.isObjectAvailable(picture) ? picture[constants.FIX_CONST.RECIPE_THUMB_SIZE] : '',
          mealType: "dessert"
        };

        array.push(node);
        node = {};
      }
    });

    if (JSON.stringify(filterList) != JSON.stringify(array)) {
      this.setState({ filterList: array, isLoading: false });
    }
  }

  handleBackButton = () => {
    const { navigation } = this.props;
    navigation.pop();
    return true;
  }

  getMenu = () => {
    const { userData, getMenuRequest } = this.props;

    if (this.isAuthenticated()) {
      const params = { access_token: userData.access_token };
      getMenuRequest(params);
    }
  };

  delMenu = uid => {
    const { userData, delMenuRequest } = this.props;

    if (this.isAuthenticated()) {
      const params = {
        access_token: userData.access_token,
        meal_id: uid
      };
      delMenuRequest(params);
    }
  };

  editGuest = uid => {
    const { userData, editGuestRequest, navigation } = this.props;
    const { popupCount } = this.state;

    if (this.isAuthenticated()) {
      const params = {
        access_token: userData.access_token,
        meal_id: uid,
        servings: popupCount
      };
      editGuestRequest(params);
    }
  };

  dialogPop = () => {
    const { dialogShow } = this.state;

    return (
      <Dialog
        rounded
        width={1}
        visible={dialogShow}
        containerStyle={{ justifyContent: "flex-end" }}
        dialogStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onDismiss={() => this.setState({ dialogShow: false })}
        onTouchOutside={() => this.setState({ dialogShow: false })}
      >
        <DialogContent style={{ paddingVertical: 50 }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 25
            }}
          >
            <IconDelPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={` Êtes-vous sûr de vouloir supprimer ce menu ?`}
            />
            <TouchableOpacity
              style={[
                styles.btnStyle,
                { backgroundColor: constants.colors.tint }
              ]}
              onPress={() => this.setState({ dialogShow: false })}
            >
              <AvoText
                style={[styles.recipeTxt, { color: "white" }]}
                fontWeight="bold"
                text={`Supprimer`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyle, { backgroundColor: "white" }]}
              onPress={() => this.setState({ dialogShow: false })}
            >
              <IconReplace />
              <AvoText
                style={[
                  styles.recipeTxt,
                  { color: constants.colors.grey, marginLeft: 10 }
                ]}
                fontWeight="bold"
                text={`Remplacer`}
              />
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
    );
  };

  renderGuestDialogPop = () => {
    const { dialogShowAdd, popupCount, filterList } = this.state;
    const { navigation } = this.props;

    return (
      <Dialog
        containerStyle={{ justifyContent: "flex-end" }}
        onDismiss={() => this.setState({ dialogShowAdd: false })}
        rounded
        dialogStyle={{ backgroundColor: 'transparent' }}
        width={1}
        onTouchOutside={() => this.setState({ dialogShowAdd: false })}
        visible={dialogShowAdd}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <DialogContent style={{ paddingVertical: 50 }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 25
            }}
          >
            <IconEditPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="bold"
              text={` Modifier la recette`}
            />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={` Nombre de convives`}
            />
            <View style={styles.popupRowControl}>
              <View style={styles.popupContainer1}>
                <TouchableOpacity
                  style={styles.mathBtn}
                  onPress={() => {
                    this.setState({
                      popupCount: popupCount > 1 ? popupCount - 1 : 1
                    });
                  }}
                >
                  <IconMinusGreen />
                </TouchableOpacity>
                <AvoText
                  style={[
                    styles.recipeTxt,
                    { fontSize: constants.sizes.BTN_TXT_SIZE, flex: 1 }
                  ]}
                  fontWeight="bold"
                  text={popupCount}
                />
                <TouchableOpacity
                  style={styles.mathBtn}
                  onPress={() => {
                    this.setState({
                      popupCount: popupCount + 1
                    });
                  }}
                >
                  <IconPlusGreen />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.popupContainer2}
                onPress={() => {
                  this.setState({ dialogShowAdd: false });
                  var params = filterList[this.selectedIndex];
                  this.editGuest(params.mealId);
                }}
              >
                <AvoText
                  style={[
                    styles.recipeTxt,
                    { fontSize: constants.sizes.TXT_SIZE, color: "white" }
                  ]}
                  fontWeight="normal"
                  text={`C'est parti !`}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.popupRowControl}>
              <AvoButton
                iconBtn={
                  <IconReplaceWhite
                    style={{ marginRight: 10, tintColor: "#fff" }}
                  />
                }
                style={styles.buttonPop}
                title="Remplacer"
                onPress={() => {
                  this.setState({ dialogShowAdd: false }, () => {
                    var Params = filterList[this.selectedIndex];
                    navigation.push("AddRecipe", {
                      old_recipe_uid: Params.uid,
                      meal_id: Params.mealId
                    });
                  });
                }}
              />
              <AvoButton
                style={styles.buttonPopNag}
                txtStyle={{ color: constants.colors.grey }}
                title="Supprimer"
                iconBtn={<IconDelete style={{ marginRight: 10 }} />}
                isNegative={true}
                onPress={() => {
                  this.setState({ dialogShowAdd: false });
                  var Params = filterList[this.selectedIndex];
                  this.delMenu(Params.mealId);
                }}
              />
            </View>
          </View>
        </DialogContent>
      </Dialog>
    );
  };

  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    const id = this.isObjectAvailable(navigation.state.params) ? navigation.state.params.id : 1;

    return (
      <TouchableOpacity
        style={styles.slide}
        activeOpacity={0.9}
        onPress={() => navigation.push(id == 0 ? 'RecipeDetails' : "ItemDetails", { id: item.uid })}
      >
        <FastImage
          style={styles.viewImg}
          source={{ uri: item.imgUri }}
        />
        <AvoText
          style={styles.descTxt}
          fontWeight="museo"
          text={item.description}
        />
        <View
          style={[
            styles.borderStyle,
            { borderColor: constants.colors.borderColor, marginTop: 0 }
          ]}
        />
        <View
          style={[
            styles.rowContainer,
            { justifyContent: "space-between", padding: 10 }
          ]}
        >
          <TouchableOpacity
            style={[
              constants.styles.row,
              { justifyContent: "center", width: "45%" }
            ]}
            activeOpacity={0.8}
            onPress={() => {
              // this.setState({
              // 	dialogShowAdd: true
              // });
            }}
          >
            <IconUtensil width={17} height={17} />
            <AvoText
              style={{
                marginHorizontal: 10,
                fontSize: 16,
                color: constants.colors.placeholder
              }}
              fontWeight="light"
              text={`${item.person} personnes`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              constants.styles.row,
              { justifyContent: "center", width: "45%" }
            ]}
            activeOpacity={0.8}
            onPress={() => {
              this.selectedIndex = index;
              this.state.popupCount = item.person;
              this.setState({
                dialogShowAdd: true
              });
            }}
          >
            <IconEditGrey width={16} height={16} />
            <AvoText
              style={{
                marginHorizontal: 10,
                fontSize: 16,
                color: constants.colors.placeholder
              }}
              fontWeight="light"
              text={`Éditer`}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const id = this.isObjectAvailable(navigation.state.params) ? navigation.state.params.id : 1;
    const { isLoading, filterList, num1, num2 } = this.state;

    return (
      <Base>
        <Header
          title="Menu"
          navigation={navigation}
          isBack={id == 0 ? true : false}
          isBackTo={2}
        />
        <View style={styles.rowContainerCenter}>
          <AvoText
            style={styles.headerTxt}
            fontWeight='bold'
            text="Voici les "
          />
          <CircleText text={filterList.length.toString()} />
          <AvoText
            style={styles.headerTxt}
            fontWeight='bold'
            text=" recettes de votre menu actuel :"
          />
        </View>
        <ScrollView>
          <FlatList
            data={filterList}
            renderItem={this._renderItem}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            style={{
              width: constants.screen.width * 0.9,
              alignSelf: "center",
              marginVertical: 10
            }}
            scrollEnabled={false}
          />
          <AvoButton
            style={styles.button}
            title="Ajouter une recette"
            onPress={() => navigation.navigate(id == 0 ? "AddRecipeHome" : 'AddRecipe')}
          />
          <View style={styles.borderStyle} />
          {
            id == 0 &&
            <AvoText
              style={styles.title}
              fontWeight='bold'
              text={"Caractéristiques du menu"}
            />
          }
          {
            filterList.length > 0 && id == 0 &&
            <View>
              <View style={styles.rowContainerDetails}>
                {
                  num1 == 1 ?
                    <IconATag />
                    :
                    num1 == 2 ?
                      <IconBTag />
                      :
                      num1 == 3 ?
                        <IconCTag />
                        :
                        <IconDTag />
                }
                <AvoText
                  style={{ fontSize: 14 }}
                  fontWeight="light"
                  text={"Nutrition"}
                />
              </View>
              <View style={styles.rowContainerDetails}>
                {
                  num2 == 1 ?
                    <IconATag />
                    :
                    num2 == 2 ?
                      <IconBTag />
                      :
                      num2 == 3 ?
                        <IconCTag />
                        :
                        <IconDTag />
                }
                <AvoText
                  style={{ fontSize: 14 }}
                  fontWeight="light"
                  text={"Environnement"}
                />
              </View>
            </View>
          }
          {
            id == 0 &&
            <AvoButton
              isNegative
              style={styles.borderButton}
              title="Voir la liste de courses"
              onPress={() => navigation.navigate('Course')}
            />
          }
          <View style={{ height: 40 }} />
        </ScrollView>
        {this.dialogPop()}
        {this.renderGuestDialogPop()}
        {
          id == 0 &&
          <Charging isLoading={isLoading} />
        }
      </Base>
    );
  }
}

const mapDispatchToProps = {
  getMenuRequest,
  delMenuRequest,
  editGuestRequest
};

const mapStateToProps = state => {
  const { auth, menu } = state.reducer;
  const { userData } = auth;
  const { menuData, isMenuGenerated, deleteMealStatus, editGuestStatus, error, isLoading, isEditing } = menu;

  return {
    isLoading,
    isEditing,
    userData,
    menuData,
    isMenuGenerated,
    deleteMealStatus,
    editGuestStatus,
    error
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
