// Delivery screen

import React from 'react';
import { connect } from 'react-redux';
import { View, Linking } from 'react-native';

import BaseComponent from '../base';
import { BaseView, Header } from '../../components';
import { SearchBox, CheckBox, Switch, DeliveryOption } from './components';

import { 
  getStoresRequest, 
  createCartRequest, 
  searchAddressRequest 
} from '../../actions';

import styles from './styles';
import constants from '../../const';

class Delivery extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      stores: [],
      option: 0, 
      addresses: [],
      address: "",
      features: [],
      grocery: props.navigation.state.params.grocery
    }
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    const { isLoading, stores, cart, collection } = this.props;

    if (isLoading) {
      constants.showLoader.showLoader();
    } else {
      constants.showLoader.hideLoader();
    }

    if (stores != prevProps.stores && this.isValueAvailable(stores)) {
      this.setState({ stores });
    }
    
    if (this.isObjectAvailable(cart) && cart != prevProps.cart) {
      const { basket_url } = cart;

      if (this.isStringAvailable(basket_url)) {
        Linking.openURL(basket_url);
      }
    }

    if (this.isObjectAvailable(collection) && collection != prevProps.collection) {
      const { features } = collection;

      if (this.isArrayAvailable(features)) {
        var array = [];
        features.map(item => {
          const { properties } = item;
          const { label } = properties;
          if (this.isStringAvailable(label)) {
            array.push(label);
            this.setState({ address: label });
          }
        });
        this.setState({ addresses: array, features });
      }
    }
  }

  onChangeSearchText = text => {
    const { searchAddressRequest } = this.props;
    searchAddressRequest(text);
  }

  onAddress = i => {
    const { getStoresRequest } = this.props;
    const { features, option } = this.state;
    const feature = features[i];
    const { geometry } = feature;
    const { coordinates } = geometry;
    const params = {
      lat: coordinates[1],
      lon: coordinates[0],
      drive: option ? true : false,
      delivery: option ? false : true,
      radius: 1
    };
    getStoresRequest(params);
    this.setState({ longitude: coordinates[0], latitude: coordinates[1] });
  }

  onSearch = () => {
    const { getStoresRequest } = this.props;
    const { latitude, longitude, option } = this.state;
    const params = {
      lat: latitude,
      lon: longitude,
      drive: option ? true : false,
      delivery: option ? false : true,
      radius: 10
    };
    getStoresRequest(params);
  }

  onCheck = isChecked => {

  }

  onSwitch = index => {
    this.setState({ option: index }, () => {
      this.onSearch();
    });
  }

  onChooseDeliveryType = async store => {
    const { createCartRequest } = this.props;
    const { address, grocery } = this.state;
    const { id } = store;

    var ingredients = [];
    grocery.map(item => {
      ingredients.push({
        name: item.name,
        qty: item.quantity,
        unit: item.unit
      });
    });

    const params = {
      store_id: id,
      delivery_address: address,
      cardType: "string",
      recipes: [{
        id: 9575,
        nb_pers: 14
      }],
      ingredients
    };
    createCartRequest(params);
  }

  render() {
    const { navigation } = this.props;
    const { option, addresses, stores } = this.state;

    return (
      <BaseView>
        <Header title="Ma Livraison" navigation={navigation} isBack />

        <View style={styles.container}>
          <CheckBox onCheck={isChecked => this.onCheck(isChecked)} />
          <Switch onSwitch={index => this.onSwitch(index)} />
          <DeliveryOption
            stores={stores}
            option={option ? 'Drive' : 'Livraison'}
            onChooseDeliveryOption={store => this.onChooseDeliveryType(store)} 
          />
          <SearchBox
            address={addresses}
            onChangeText={text => this.onChangeSearchText(text)}
            onAddress={i => this.onAddress(i)}
            onSearch={() => {this.onSearch()}}
          />
        </View>
      </BaseView>
    )
  }

}

const mapDispatchToProps = {
  getStoresRequest,
  createCartRequest,
  searchAddressRequest
};

const mapStateToProps = state => {
  const { delivery } = state.reducer;
  const { collection } = delivery;

  return {
    isLoading: delivery.isLoading,
    stores: delivery.stores,
    cart: delivery.cart,
    collection
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);