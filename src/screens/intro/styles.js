// Styles

import { StyleSheet } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	wrapperCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapperHCenter: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 20
	},
	swiperContainer: {
		width: constants.screen.width * 3,
		flex: 1
	},
	swiperImage: {
		flex: 1.2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	swiperDesc: {
		flex: 0.8,
		width:constants.screen.width * 3,
		flexDirection: 'row'
	},
	swiperDescTitle: {
		color: constants.colors.tint,
		fontSize: constants.sizes.TITLE_SIZE,
		textAlign: 'center',
		marginBottom: 26
	},
	swiperDescText: {
		color: 'black',
		fontSize: constants.sizes.TXT_SIZE,
		textAlign: 'center',
		marginBottom: 26
	},
	mainImage: {
		position: 'absolute',
		top: (constants.screen.height / 2 - constants.screen.width * 0.8) / 1.5,
		alignItems: 'center',
		width: constants.screen.width,
		height: constants.screen.width * 0.9
	},
	footer: {
		paddingHorizontal: 20,
		width: '100%',
		paddingBottom: 20,
		flexDirection: 'row'
	},
	back: {
		color: constants.colors.grey,
		fontSize: constants.sizes.TXT_SIZE
	},
	forward: {
		color: constants.colors.tint,
		fontSize: constants.sizes.TXT_SIZE
	}
});

export default styles;
