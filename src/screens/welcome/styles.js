// Styles

import { StyleSheet } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    width: '100%',
    alignItems: 'center',
    marginVertical: constants.screen.height*0.045
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal:5,
    backgroundColor: constants.colors.tint50
  },
  bigCircle: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: constants.colors.tint,
    shadowColor: constants.colors.tint,
    shadowOffset: {
      x: 0,
      y: 3
    },
    marginHorizontal:5,
    shadowRadius: 3,
    shadowOpacity: 0.5
  },
  wrapperCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapperHCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  swiperContainer: {
    width: constants.screen.width * 4,
    flexDirection: 'row'
  },
  swiperDescTitle: {
    color: constants.colors.tint,
    fontSize: constants.sizes.TITLE_SIZE,
    textAlign: 'center',
  },
  swiperButtonWrapper: {
    backgroundColor: "red",
    height: 100,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: constants.screen.width,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  footer: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    marginBottom: constants.isIphoneX ? 40 : 20
  },
  back: {
    color: constants.colors.grey,
    fontSize: constants.sizes.TXT_SIZE
  },
  forward: {
    color: constants.colors.tint,
    fontSize:  constants.sizes.TXT_SIZE
  }
});

export default styles;