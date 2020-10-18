// Inspiration Card

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import StarRating from 'react-native-star-rating';

import AvoText from '../avoText';
import { IconClock, ImageCancelTxt, IconHeartSwipe } from '../../assets/svg';

import constants from '../../const';

class InspirationCard extends React.Component {

  render() {
    const { item, navigation, onDislike, onLike } = this.props;
    const { imgUri, description, time, rating, views, suggestion } = item;

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push("ItemDetails", {
            id: suggestion.uid
          })
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: imgUri }}
        />
        <AvoText
          style={styles.title}
          fontWeight="bold"
          text={description}
        />
        <View style={styles.rowContainerTime}>
          <View style={styles.rowView}>
            <IconClock
              width={constants.screen.width * 0.05}
              height={constants.screen.width * 0.05}
            />
            <AvoText
              style={styles.time}
              fontWeight="normal"
              text={time}
            />
          </View>
          <View style={styles.rowView}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rating}
              starSize={12}
              fullStarColor={"yellow"}
              emptyStarColor={"grey"}
              starStyle={{ marginHorizontal: 1 }}
            />
            <AvoText
              style={styles.star}
              fontWeight="normal"
              text={views}
            />
          </View>
        </View>
        <View style={[styles.borderStyle, { marginVertical: 0 }]} />
        <View style={[styles.rowContainer, { justifyContent: "space-between", marginVertical: 15 }]}>
          <TouchableOpacity
            onPress={onDislike}
            style={[styles.rowContainer, { justifyContent: "center", width: "45%", marginBottom: 5 }]}
          >
            <ImageCancelTxt height={25} />
            <AvoText
              style={styles.unlike}
              fontWeight="light"
              text={`Je n'aime pas`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLike}
            style={[styles.rowContainer, { justifyContent: "center", width: "45%", marginBottom: 0 }]}
          >
            <IconHeartSwipe height={20} />
            <AvoText
              style={styles.like}
              fontWeight="light"
              text={`J'aime`}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: constants.screen.width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: constants.screen.width * 0.9,
    height: constants.screen.width * 0.3,
  },
  title: {
    fontSize: constants.sizes.TXT_SIZE + 2,
    marginHorizontal: 10,
    marginTop: 15,
    color: 'black'
  },
  rowContainerTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 10
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  time: {
    marginHorizontal: 5,
    marginTop: Platform.OS == "android" ? 0 : 3,
    fontSize: constants.sizes.TXT_SIZE - 2,
    color: "black"
  },
  star: {
    marginHorizontal: 5,
    marginTop: Platform.OS == "android" ? 0 : 3,
    fontSize: constants.sizes.TXT_SIZE - 2,
    color: "black"
  },
  borderStyle: { 
    width: '100%', 
    borderColor: constants.colors.borderColor, 
    borderTopWidth: 0.5, 
    marginVertical: 10 
  },
  unlike: {
    marginHorizontal: 10,
    fontSize: constants.sizes.TXT_SIZE,
    color: "#7283A7"
  }, 
  like: {
    marginHorizontal: 10,
    fontSize: constants.sizes.TXT_SIZE,
    color: "#FF784C"
  },
  rowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 10
	},
});

InspirationCard.propTypes = {

};

InspirationCard.defaultProps = {

};

export default InspirationCard;