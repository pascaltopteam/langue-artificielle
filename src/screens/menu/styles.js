// Styles

import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from '../../Utilities';
import constants from '../../const';

const styles = StyleSheet.create({
	optBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		backgroundColor: constants.colors.bg,
		padding: 10
	},
	container: {
		alignItems: 'center',
		height: '100%',
		paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() * 2,
		backgroundColor: 'white'
	},
	borderStyle: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		borderColor: constants.colors.borderColor,
		borderTopWidth: 0.5,
		marginVertical: 10
	},
	content: {
		backgroundColor: 'yellow'
	},
	mathBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12 },
	popupRowControl: {
		width: '90%',
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	popupContainer1: {
		flex: 3,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderColor: constants.colors.grey,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	popupContainer2: {
		flex: 2,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderColor: constants.colors.tint,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: constants.colors.tint,
		padding: 10
	},
	button: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		marginVertical: 10
	},
	buttonPopNag: {
		width: '48%',
		alignSelf: 'center',
		marginVertical: 10
	},
	buttonPop: {
		width: '48%',
		alignSelf: 'center',
		marginVertical: 10
	},
	headerTxt: { 
		fontSize: 14, 
		color: '#000' 
	},
	btnStyle: {
		width: '90%',
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	rowContainerDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		alignSelf: 'center',
		width: constants.screen.width * 0.9
	},
	boxContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 5,
		width: constants.screen.width * 0.275,
		backgroundColor: constants.colors.bg,
		height: constants.screen.width * 0.25
	},
	recipeTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center'
	},
	popupTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center',
		marginVertical: 15,
		width: '70%'
	},
	detailTxt: {
		fontSize: constants.sizes.TXT_SIZE - 1,
		color: 'black',
		textAlign: 'center'
	},
	ingrTxt: { fontSize: constants.sizes.TXT_SIZE, margin: 7, color: 'white' },
	borderButton: {
		borderWidth: 1,
		borderColor: constants.colors.tint,
		width: constants.screen.width * 0.9,
		alignSelf: "center",
		marginVertical: 20
	},

	//Card row view
	cardStyle: {
		backgroundColor: '#FE474C',
		borderRadius: 5,
		width: constants.screen.width * 0.9,
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.5
	},
	descTxt: { fontSize: 18, margin: 10, color: 'black' },
	descTxtTitle: { fontSize: constants.sizes.TXT_SIZE + 2, marginVertical: 10, color: 'black' },
	flexTxt: { fontSize: constants.sizes.TXT_SIZE - 2, color: 'black', flex: 1, marginHorizontal: 10 },
	flexTxtLight: { fontSize: constants.sizes.TXT_SIZE - 3, color: constants.colors.placeholder },
	slide: {
		backgroundColor: 'white',
		marginVertical: 10,
		alignSelf: 'center',
		width: constants.screen.width - 40,
		borderRadius: 5,
		borderColor: constants.colors.border,
		overflow: 'hidden'
	},
	viewImg: {
		width: constants.screen.width - 40,
		height: constants.screen.width * 0.3,
	},
	searchBox: {
		width: constants.screen.width * 0.9,
		alignItems: 'center'
	},
	rowView: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 10
	},
	rowContainerCenter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 15,
		alignSelf: 'center',
		width: constants.screen.width * 0.9
	},
	title: {
		marginVertical: 10,
		width: constants.screen.width * 0.9,
		fontSize: 14,
		alignSelf: 'center'
	},

	//dropdown
	dropdownBoxStyle: {
		width: 200,
		height: 200,
		marginTop: Platform.OS === 'ios' ? 10 : 10,
		shadowColor: constants.colors.grey,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 6,
		shadowOpacity: 0.2,
		elevation: 5
	},
	dropdownBtnTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		marginVertical: 15,

		color: constants.colors.placeholder
	},
	dropdownBtn: {
		borderColor: constants.colors.borderColor,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 10,
		flexDirection: 'row',
		marginRight: 10,
		width: 200,
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	//Scroll Effect
	navContainer: {
		width: constants.screen.width,
		backgroundColor: 'rgba(0,0,0,0)',
		paddingTop: Platform.OS === 'android' ? 5 : getStatusBarHeight(),
		paddingHorizontal: 10
	}
});

export default styles;
