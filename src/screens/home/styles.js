// Styles

import { StyleSheet, Platform } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},
	title: {
		fontSize: constants.sizes.TITLE_SIZE,
		color: constants.colors.tint,
		marginTop: 30
	},
	descTxt: {
		width: '90%',
		alignSelf: 'center',
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center',
		marginTop: 30
	},
	button: {
		width: '48%'
	},
	counterStyle: {
		fontSize: constants.sizes.BTN_TXT_SIZE,
		flex: 1,
		color: 'black',
		textAlign: 'center',
		alignSelf: 'center',
	},
	mathBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12 },
	btnStyle: {
		flex: 2,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		borderColor: constants.colors.tint,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: constants.colors.tint,
		padding: Platform.OS == 'ios' ? 10 : 5
	},
	popupRowControl: {
		width: '80%',
		borderRadius: 5,
		marginTop: 30,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	popupContainer: {
		flex: 3,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		borderColor: constants.colors.grey,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	bottomImage: {
		position: "absolute",
		bottom: 2,
		right: constants.screen.width * 0.1
	}
});

export default styles;
