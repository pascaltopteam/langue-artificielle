// Inspiration

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import BaseComponent from '../../base';
import { AvoText } from '../../../components';
import InspirationScroll from './inspirationScroll';

import { likeDislikeRecRequest } from '../../../actions/authActions';
import { getInspirationRequest } from '../../../actions';

import constants from "../../../const";
import styles from "./styles";

class Inspiration extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      dialogShow: false,
      inspirations: []
    };
  }

  componentDidMount() {
    const {
      isWaiting,
      userData,
      inspirationsObject,
      getInspirationRequest
    } = this.props;
 
    if (this.isObjectAvailable(inspirationsObject)) {
      this.loadInspiration(inspirationsObject);
      return;
    }

    if (!this.isAuthenticated() || isWaiting) return;

    const { access_token } = userData;
    const params = {
      access_token,
      limit: 20
    };
    getInspirationRequest(params);
  }

  componentDidUpdate = (prevProps) => {
    const { inspirationsObject, isWaiting } = this.props;

    if (isWaiting) {
      constants.showLoader.showLoader();
    } else {
      constants.showLoader.hideLoader();
    }

    if (inspirationsObject != prevProps.inspirationsObject) {
      this.loadInspiration(inspirationsObject);
    }
  };

  /*  Set inspirations 
  **  Params - inspirationsObject (Object from API)
  */
  loadInspiration = inspirationsObject => {
    if (!this.isObjectAvailable(inspirationsObject)) return;
    
    const { inspirations } = this.state;
    const { recipes } = inspirationsObject;
    var array = [];

    recipes.map(item => {
      const { id, total_time, reviews, name, picture } = item;
      const node = {
        id,
        time: total_time + " minutes",
        views: reviews.length + " avis",
        rating: 4,
        description: name,
        imgUri: picture[constants.FIX_CONST.RECIPE_THUMB_SIZE],
        suggestion: item
      };
      array.push(node);
    });

    if (JSON.stringify(inspirations) != JSON.stringify(array)) {
      this.setState({ inspirations: array });
    }
  }

  /* This method is called when user swipes right card. It performs 'like'
  ** Params - item (card data), index (index of card)
  */
  onSwipeRight = (item, index) => {
    const { likeDislikeRecRequest, userData, getInspirationRequest } = this.props;
    const { inspirations } = this.state;
    const { access_token } = userData;
    const { suggestion } = item;

    var params = {
      access_token,
      typeUrl: 0,
      id: suggestion.uid
    };
    likeDislikeRecRequest(params);

    var array = inspirations;
    delete array[index];
    this.setState({ inspirations: array });

    if (array.length < 1) {
      params = { access_token, limit: 20 };
      getInspirationRequest(params);
    }
  };

  /* This method is called when user swipes left card. It performs 'unlike'
  ** Params - item (card data), index (index of card)
  */
  onSwipeLeft = (item, index) => {
    const { likeDislikeRecRequest, userData, getInspirationRequest } = this.props;
    const { inspirations } = this.state;
    const { access_token } = userData;
    const { suggestion } = item;

    var params = {
      access_token,
      typeUrl: 1,
      id: suggestion.uid
    };
    likeDislikeRecRequest(params);

    var array = inspirations;
    delete array[index];
    this.setState({ inspirations: array });

    if (array.length < 1) {
      params = { access_token, limit: 20 };
      getInspirationRequest(params);
    }
  };


  renderNoMoreCards = () => {
    const { isWaiting } = this.props;

    return (
      <View style={styles.noCardView}>
        {
          isWaiting != true &&
          <AvoText
            style={{ fontSize: constants.sizes.TXT_SIZE }}
            text={`Il n'y a pas d'éléments à afficher`}
          />
        }
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { inspirations } = this.state;

    return (
      <View style={styles.container}>
        <InspirationScroll
          data={inspirations}
          navigation={navigation}
          onSwipeLeft={(item, index) => this.onSwipeLeft(item, index)}
          onSwipeRight={(item, index) => this.onSwipeRight(item, index)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
	getInspirationRequest,
	likeDislikeRecRequest
};

const mapStateToProps = state => {
  const { auth, inspiration } = state.reducer;
  const { inspirationsObject, isLoadingInspiration } = inspiration;

  return {
    isWaiting: isLoadingInspiration,
    accessToken: auth.accessToken,
    id: auth.id,
    error: auth.eMessage,
    userData: auth.userData,
    inspirationsObject,
    isRecipeStatusUpdate: auth.isRecipeStatusUpdate
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inspiration);
