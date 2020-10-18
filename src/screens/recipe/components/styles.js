// Styles

import { StyleSheet, Platform } from 'react-native';

import constants from '../../../const';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  searchBox: {
		width: '100%',
		paddingHorizontal: 16,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
  },
  settingBtn: {
		marginLeft: 16,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center'
  },
  coverWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: constants.colors.modal
  },
  tab: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
    width: constants.screen.width * 0.6,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
		shadowColor: constants.colors.grey,
		shadowOpacity: 0.5,
		shadowOffset: {
			x: 0,
			y: 5
		},
    shadowRadius: 5,
    marginVertical: 10
  },
  tabTitle: {
    color: constants.colors.tint
  },
  tabButton: {
    ...constants.styles.wrapperCenter,
    justifyContent: 'center',
    margin: 2,
    borderRadius: 18
  },
  tabIndicator: {
    height: 36,
    width: (constants.screen.width * 0.6) / 2 + 10,
    backgroundColor: constants.colors.tint,
    borderRadius: 19
  },
  slide: {
		backgroundColor: 'white',
		marginVertical: 10,
		alignSelf: 'center',
		alignSelf: 'center',
    width: constants.screen.width * 0.9,
    borderRadius: 5,
    borderColor: constants.colors.border,
    overflow: 'hidden'
  },
  viewImg: {
		width: constants.screen.width * 0.9,
		height: constants.screen.width * 0.3,
  },
  descTxt: { 
    fontSize: constants.sizes.TXT_SIZE + 2, 
    margin: 10, 
    color: 'black' 
  },
  borderStyle: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		borderColor: constants.colors.borderColor,
		borderTopWidth: 0.5,
		marginVertical: 10
  },
  rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 10
  },
  noCardView: {
    paddingTop: constants.screen.height * 0.4,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  searchResultBox: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    borderRadius: 5,
    width: constants.screen.width - 32,
    padding: 10,
    backgroundColor: 'white',
    maxHeight: 40 * 10 + 20
  },
  searchItem: {
    width: '100%',
    borderBottomColor: constants.colors.border,
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center'
  }
});

export default styles;