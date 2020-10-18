// Home Page

import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, BackHandler } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import BaseComponent from '../base';
import { BaseView, Header, AvoText } from "../../components";
import { ImageBgBottom, IconMinusGreen, IconPlusGreen } from "../../assets/svg";

import { autoLoginRequest } from "../../actions/authActions";
import { generateMenuRequest } from '../../actions/menu';

import styles from "./styles";
import constants from "../../const";

class Home extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      popupCount: 1,
      isGenerateRequest: false,
      profileUrl: ""
    };
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    const { userData } = this.props;
    const { picture } = userData;

    if (!this.isAuthenticated()) return;

    this.setState({ profileUrl: picture });
  };

  componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

  handleBackButton = () => {
		return true;
	}

  autoLoginCheck = (token, access_token) => {
    const { autoLoginRequest } = this.props;
    const params = { token, access_token };
    autoLoginRequest(params);
  };

  getMenu = () => {
    const { userData, generateMenuRequest, navigation } = this.props;
    const { access_token } = userData;
    const { popupCount } = this.state;
    const params = {
      access_token,
      nb_meal: popupCount
    };
    generateMenuRequest(params);
    navigation.navigate('MenuHome', { id: 0 });
  };

  render() {
    const { navigation } = this.props;
    const { profileUrl, popupCount } = this.state;

    return (
      <BaseView>
        <Header
          profileUrl={profileUrl}
          title="Bienvenue"
          navigation={navigation}
        />
        <View style={constants.styles.wrapperCenter}>
          <AvoText style={styles.title} text="Planifier mes repas" fontWeight="museo" />
          <AvoText
            style={styles.descTxt}
            text="Combien de plats souhaites-tu préparer"
            fontWeight="normal"
          />
          <ImageBgBottom
            width={constants.screen.width * 0.6}
            style={styles.bottomImage}
          />
          <View style={styles.popupRowControl}>
            <View style={styles.popupContainer}>
              <TouchableOpacity
                style={styles.mathBtn}
                onPress={() => this.setState({ popupCount: popupCount > 0 ? popupCount - 1 : 0 })}
              >
                <IconMinusGreen />
              </TouchableOpacity>
              <AvoText
                style={styles.counterStyle}
                fontWeight="museo"
                text={popupCount.toString()}
              />
              <TouchableOpacity
                style={styles.mathBtn}
                onPress={() => this.setState({ popupCount: popupCount + 1 })}
              >
                <IconPlusGreen />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => this.getMenu()}
            >
              <AvoText
                style={{ fontSize: 16, color: "white" }}
                fontWeight="normal"
                text={`C'est parti !`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BaseView>
    );
  }
}

const mapDispatchToProps = { 
  generateMenuRequest, 
  autoLoginRequest 
};

const mapStateToProps = state => {
  const { auth, menu } = state.reducer;
  const { isLoading, isMenuGenerated, errorMessage } = menu;

  return {
    isWaiting: auth.isWaiting,
    accessToken: auth.accessToken,
    id: auth.id,
    error: auth.eMessage,
    userData: auth.userData,
    isLoading,
    isMenuGenerated,
    generateError: errorMessage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
