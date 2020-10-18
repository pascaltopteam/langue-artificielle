// Delivery Option

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { AvoText } from '../../../components';
import { ImageFranprix, ImageCasino, ImageToupargel, IconRightArrow } from '../../../assets/svg';
import constants from '../../../const';

class DeliveryOption extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderBrand = name => {
    const imageWidth = constants.screen.width * 0.37;

    if (name == 'Franprix') {
      return <ImageFranprix width={imageWidth} height={imageWidth / 2} />;
    }
    if (name == 'Casino') {
      return <ImageCasino width={imageWidth} height={imageWidth / 2} />;
    }
    return <ImageToupargel width={imageWidth} height={imageWidth / 2} />;
  }

  renderItem = ({ item }) => {
    const { id, chain_name, address } = item;
    console.log(item);
    return (
      <TouchableOpacity
        key={id}
        style={styles.deliveryItem}
        activeOpacity={0.9}
        onPress={() => this.props.onChooseDeliveryOption(item)}
      >
        {this.renderBrand(chain_name)}
        <AvoText
          style={[styles.deliveryDesc, { color: chain_name == 'franprix' ? constants.colors.pink : constants.colors.greenBg }]}
          fontWeight='bold'
          text={address}
        />
        <IconRightArrow width={6} height={10} />
      </TouchableOpacity>
    );
  }

  render() {
    const { stores, option } = this.props;

    return (
      <View style={styles.container}>
        <AvoText
          style={styles.title}
          fontWeight='museo'
          text={option}
        />
        <FlatList
          style={constants.styles.wrapper}
          data={stores}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1
  },
  title: {
    color: constants.colors.tint,
    fontSize: 29,
    marginBottom: 10
  },
  deliveryItem: {
    flexDirection: 'row',
    width: '100%',
    height: 93,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'transparent',
    paddingLeft: 8,
    paddingRight: 16,
    alignItems: 'center',
    marginBottom: 10
  },
  deliveryDesc: {
    flex: 1,
    fontSize: 14,
    marginLeft: 29
  }
});

export default DeliveryOption;