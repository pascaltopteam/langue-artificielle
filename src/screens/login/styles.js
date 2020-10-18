// Styles

import { StyleSheet } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20
	},
	wrapperCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	row: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		position: 'absolute',
		top: 0,
		left: -2,
		right: -2
	},
	headerBg: {
		width: constants.screen.width + 4,
		height: (constants.screen.width + 4) * 0.735
	},
	logo: {
		width: constants.screen.width * 0.72,
		height: constants.screen.width * 0.72 * 0.3
	},
	inputBlock: {
		flex: 4.5,
		width: constants.screen.width*0.9,
		backgroundColor: 'white',
		borderRadius: 10,
		marginTop: 25,
		overflow: 'hidden'
	},
	inputScroll: {
		flex: 1
	},
	input: {
		width: '100%',
		marginTop: 25
	},
	fyp: {
		fontSize: constants.sizes.TXT_SIZE,
		textAlign: 'center',
		marginTop: 34
	},
	button: {
		width: '100%',
		marginTop: 25
	},
	fypLogin: {
		fontSize: constants.sizes.TXT_SIZE-2,
		color: constants.colors.placeholder
	}
});

export default styles;
